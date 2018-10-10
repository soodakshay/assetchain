var swig = require('swig');
var config = require('../config.js');
var nodemailer = require("nodemailer");
//create  smtp transport
var smtpTransport = nodemailer.createTransport(config.smtp);

// send mail
exports.send = function (to, subject, content)
{
    var tpl_swig = swig.compileFile('public/mail_page/index.html');
    var template = tpl_swig({content: content, image_logo: serviceurl + 'images/logo.jpg'});
    smtpTransport.sendMail({
        from: config.admin.email, // sender address from configuration collection
        to: to, // user email_id
        subject: subject, // Subject line
        html: template
    }, function (mailError, info)
    {
        if (!mailError)
        {
            console.log("mail_info " + info.messageId);
        } else
        {
            console.log(mailError);
        }
    });
    return 1;
};

// send mail
exports.send_with_attachment = function (to, subject, content, pdf_name, pdfData)
{
    var tpl_swig = swig.compileFile('public/mail_page/index.html');
    var template = tpl_swig({content: content, image_logo: serviceurl + 'images/logo.jpg'});
    smtpTransport.sendMail({
        from: config.admin.email, // sender address from configuration collection
        to: to, // user email_id
        subject: subject, // Subject line
        html: template,
        attachments: [{'filename': pdf_name, 'content': pdfData}]
    }, function (mailError, info)
    {
        if (!mailError)
        {
            console.log("mail_info " + info.messageId);
        } else
        {
            console.log(mailError);
        }
    });
    return 1;
};

exports.send_to_all = function (code_info, email_array, subject, content)
{
    var tpl_swig = swig.compileFile('public/mail_page/index.html');
    content = content.replace("@name@", code_info.code);
    content = content.replace("@discount@", code_info.discount);
    content = content.replace("@description@", code_info.description);
    content = content.replace("@expiry@", code_info.expiry);

    var template;
    for (var i = 0; i < email_array.length; i++)
    {
        console.log(email_array[i].email);
        content = content.replace("@cust_name@", email_array[i].name);
        template = tpl_swig({content: content, image_logo: serviceurl + 'images/logo.jpg'});
        smtpTransport.sendMail({
            from: config.admin.email, // sender address from configuration collection
            to: email_array[i].email, // user email_id
            subject: subject, // Subject line
            html: template
        }, function (mailError, info)
        {
            if (!mailError)
            {
                console.log("promo code mail_info " + info.messageId);
            } else
            {
                console.log(mailError);
            }
        });
    }
    return 1;
};