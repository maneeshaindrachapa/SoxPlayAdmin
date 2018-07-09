'use strict';
var http = require("http");
var loopback = require("loopback");
var path = require('path');

module.exports = function (Email) {
    // send an email
    Email.sendEmail = function (msg,cb) {
        //msg=JSON.parse(msg);
        // create a custom object your want to pass to the email template. You can create as many key-value pairs as you want
        //var myMessage = {heading:"yo",text:msg.html};
        // prepare a loopback template renderer
        //var renderer = loopback.template(path.resolve(__dirname, '../../common/views/email-template.ejs'));
        
        msg=msg.replace("\"\{","\{");
        msg=msg.replace("\}\"","\}");
        msg=JSON.parse(msg);

        Email.app.models.Email.send({
            to: msg.to,
            from: msg.from,
            subject: msg.subject,
            text: "",
            html:msg.html
        }, function (err, mail) {
            console.log('email sent!');
            cb(err);
        });
    }
    Email.remoteMethod(
        'sendEmail',{
            http:{path:'/sendEmail',verb:'POST'},
            description:[
                "send email using loopback"
            ],
            accepts:{arg:'msg',type: 'string'},
            returns:{arg:'greeting',type:'string'}
        }
    );
};