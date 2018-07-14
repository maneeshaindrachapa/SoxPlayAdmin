'use strict';

module.exports = function(Order) {
    Order.byStatus = function (status, cb) {
        var ds = Order.dataSource;
        var sql = "SELECT * FROM `order` WHERE status=?";
        ds.connector.query(sql,[status], function (err, orders) {
            if (err) console.error(err);
            cb(err, orders);
        });
    }
    Order.remoteMethod(
        'byStatus',
        {
            http: {path:'/byStatus',verb: 'GET' },
            description: 'Get list of Orders by Status',
            accepts: { arg: 'status', type: 'string' },
            returns: { arg: 'data', type: ['Order'], root: true}
        }
    );

};
