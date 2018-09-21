'use strict';

const app = require('../../server/server.js');
const stripe = require("stripe")("sk_test_38vE3vzF1b5MpyNioZGcNenl");
const logger = require('../../server/winston-logger').logger();

module.exports = function (Order) {
    Order.validateOrder = (req, cb) => {
        const body = req.body;
        logger.info('Validate Order', {meta: body});
        // validate price
        let price2 = 0, price3 = 0, cDiscount = 0;
        // count total item count
        body['selectedItems'].forEach(function (x) {
            price2 += x.unitPrice * x.quantity;
        });

        // function definition (not execute here)
        const afterCoupon = () => {
            price3 = price2 - cDiscount;

            logger.info('3 Prices', {meta: {
                    price2: price2,
                    price3: price3
                }});

            // TODO can be false
            if (price2 !== body.ngPrice2 || price3 !== body.ngPrice3) {
                logger.error('Invalid Prices');
                return cb({err: 'Price differ'}, null);
            } else {
                const random = getRandomToken();
                logger.info('Token for order', {meta: random});
                const odrObj = {
                    addedDate: new Date().getTime(),
                    shippingCost: 0,
                    totalCost: 0,
                    finalCost: price3,
                    trackingId: random,
                };
                
                // validate user
                if(body.userId) {
                    logger.info('Auth User', {meta: req.accessToken});
                    if (req.accessToken && req.accessToken.userId && req.accessToken.userId === body.userId) {
                        odrObj['userId'] = req.accessToken.userId;
                    } else {
                        logger.error('Invalid user');
                        return cb({err: 'invalid user'}, null);
                    }
                } else {
                    logger.info('No Auth');
                    odrObj['additionalNote'] = body.additionalNote;
                }

                app.models.order.create(odrObj, (err, newOrder) => {
                    if (err) throw err;
                    logger.info('Create order object', {meta: newOrder});
                    return cb(null, {
                        success: true,
                        orderId: newOrder.id,
                        orderPrice: odrObj.finalCost,
                        token: random
                    })
                })
            }
        };

        if (body.couponId) {
            logger.info('Has coupon', {meta: body.couponId});
            app.models.coupon.findById(body.couponId).then(function (coupon) {
                if (!coupon.expire || (coupon.expire && new Date(coupon.expire) && new Date())) {
                    if (coupon.discount_percentage && coupon.discount_percentage > 0) {
                        cDiscount = price2 * coupon.discount_percentage / 100;
                    } else if (coupon.discount_value && coupon.discount_value > 0) {
                        cDiscount = coupon.discount_value;
                    }
                } else {
                    logger.error('Expire or invalid coupon');
                    return cb({err: 'expire coupon'}, null)
                }
                afterCoupon(); // go to top definition
            });
        } else {
            afterCoupon();
        }
    };

    Order.stripPlace = (req, cb) => {
        const body = req.body; // orderId, token, orderDetails,
        logger.info('Stripe Payments', {meta: body});
        app.models.order.findById(body.orderId, (err, odr) => {
            if(err) throw err;
            if(odr && body.token.toString() === odr.trackingId) {
                logger.info('Order Found', {meta: body.orderId});
                // TODO better description, receipt_email
                const stripeObj = {
                    amount: Math.round(odr.finalCost * 100),
                    currency: 'eur',
                    description: 'Order ID: ' + odr.id,
                    source: body.stripe_id,
                };
                logger.info('Trying to pay with stripe', {meta: stripeObj});
                stripe.charges.create(stripeObj).then(function (result) {
                    odr.totalCost = body.totalPrice;
                    odr.trackingId = '';
                    odr.status = 'pending';
                    odr.raw_payment_info = JSON.stringify(result);
                    odr.save((err, newOdr) => {
                        if(err) throw err;
                        logger.info('Payment OK', {meta: newOdr});
                        logger.info('trying to fill the order details');
                        saveOrderDetails(odr, body.orderDetails, () => {
                            cb(null, { success: true });
                        });
                    })
                });
            }
        });
    };

    Order.paypalPlace = (req, cb) => {
        const body = req.body;
        logger.info('Paypal Payments', {meta: body});
        app.models.order.findById(body.orderId, (err, odr) => {
            if (err) throw err;
            if (odr && body.token.toString() === odr.trackingId) {
                logger.info('Order Found', {meta: body.orderId});
                odr.totalCost = body.totalPrice;
                odr.trackingId = '';
                odr.status = 'pending';
                odr.raw_payment_info = body.payment_info;
                odr.save((err, newOdr) => {
                    if (err) throw err;
                    logger.info('Paypal payment saved', newOdr);
                    logger.info('trying to fill the order details');
                    saveOrderDetails(odr, body.orderDetails, () => {
                        cb(null, { success: true });
                    });
                })
            } else {
                // should be delete the order
            }
        });
    };

    Order.remoteMethod('stripPlace', {
            accepts: {arg: 'req', type: 'object', 'http': {source: 'req'}},
            returns: {arg: 'result', type: 'object'}
        });
    Order.remoteMethod('validateOrder', {
            accepts: {arg: 'req', type: 'object', 'http': {source: 'req'}},
            returns: {arg: 'result', type: 'object'}
        });
    Order.remoteMethod('paypalPlace', {
            accepts: {arg: 'req', type: 'object', 'http': {source: 'req'}},
            returns: {arg: 'result', type: 'object'}
        })
};

const getRandomToken = () => {
 return Math.random() * Math.random() * Math.pow(10,  Math.floor(Math.random() * 15));
};

const saveOrderDetails = (order, details, next) => {
    // clear user cart
    let done = 0;
    logger.info('Order Details saved to be left: ' + details.length);
    details.forEach(od => {
        app.models.orderDetail.create({
            size: od.size,
            quantity: od.quantity,
            fullpack: od.fullpack,
            pair: od.pair,
            orderId: order.id,
            itemId: od.itemId
        }, (err, data) => {
            if(err) throw err;
            done += 1;
            logger.info('saved ' + done);
            if(done === details.length) {
                logger.info('All are saved');
                if(order.userId) {
                    logger.info('Clear cart details if auth');
                    app.models.cartDetail.destroyAll({userId: order.userId}, (err, count) => {
                        if(err) throw err;
                        logger.info('delete all cart details ' + count);
                        next();
                    })
                } else {
                    logger.info('Nothing to clear cart details, No auth');
                    next();
                }
            }
        });
    });
};