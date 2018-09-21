'use strict';
const conf = require('../../server/config');
const path = require('path');

const logger = require('../../server/winston-logger').logger();
const ejs = require('ejs')
    , fs = require('fs');

module.exports = function(user) {
    //send verification email after registration
    user.afterRemote('create', function (context, userInstance, next) {
        logger.info('> user.afterRemote triggered', {meta: userInstance});
        const options = {
            type: 'email',
            to: userInstance.email,
            from: 'antcommodity@gmail.com',
            subject: 'Thanks for registering.',
            template: path.resolve(__dirname, '../../server/email-templates/verify.ejs'),
            // redirect: '/?verified=true',
            user: user,
            redirect: '/user-login',
            verifyHref: conf.redirectHost + '/api/users/confirm?redirect=%2Fuser-login%3Fverifyemail%3Dtrue&uid=' + userInstance.id,
            host: conf.devHost,
            protocol: conf.protocol,
        };

        userInstance.verify(options, function (err, response, next) {
            logger.info('Save info', {meta: {err: err, res: response}});
            if (err) return next(err);
            logger.info('> verification email sent:', {meta: response});
            context.res.jsonp({success:true})
        });
    });

    // forget password
    user.on('resetPasswordRequest', function (info) {
        logger.info('Forget password', {meta: info});
        const file = fs.readFileSync(__dirname + '/../../server/email-templates/forget-pass.ejs', 'utf8');
        const messageHtml = ejs.render(file, {
            text : conf.redirectHost + '/user-login/forget-password?token=' + info.accessToken.id
        });
        user.app.models.Email.send({
            to: info.email,
            html: messageHtml,
            subject: 'Reset Password',
            from: 'antcommodity@gmail.com',
            test: 'reset password'
        }, function(err, mail) {
            logger.info('Email sent.. !', {meta: {err: err, mail: mail}});
        });

        // requires AccessToken.belongsTo(User)
        info.accessToken.user(function (err, user) {
            logger.info('user', {meta: user});
        });
    });
};