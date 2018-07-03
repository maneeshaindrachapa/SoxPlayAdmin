'use strict';

var path = require('path');

module.exports = function(user) {
    //send verification email after registration
    user.afterRemote('create', function (context, userInstance, next) {
        console.log('> user.afterRemote triggered');
        console.log(userInstance);
        var options = {
            type: 'email',
            to: userInstance.email,
            from: 'antcommodity@gmail.com',
            subject: 'Thanks for registering.',
            template: path.resolve(__dirname, '../../server/views/verify.ejs'),
            redirect: '/signup/verified',
            user: user
        };

        userInstance.verify(options, function (err, response, next) {
            if (err) return next(err);
            console.log('> verification email sent:', response);
            context.res.jsonp({success:true})
        });
    });
}