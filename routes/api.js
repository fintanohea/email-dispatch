var express = require('express');
var router = express.Router();

const helper = require('@sendgrid/mail');


/* GET users listing. */
router.get('/:action', function(req, res, next) {
    var action = req.params.action;

    if (action === 'send') {

        const sgMail = require('@sendgrid/mail');
        sgMail.setApiKey(process.env.SENDGRID_API_KEY);
        const msg = {
            to: 'fintanohea@gmail.com',
            from: 'app163557149@heroku.com',
            subject: 'Sending with Twilio SendGrid is Fun',
            text: 'and easy to do anywhere, even with Node.js',
            html: '<strong>and easy to do anywhere, even with Node.js</strong>',
        };
        
        //ES8
        (async () => {
            try {
                await sgMail.send(msg);
                res.json({
                    confirmation: 'success',
                    message: 'Email was sent'
                });
            } catch (err) {
                res.json({
                    confirmation: 'fail',
                    message: err.toString()
                });
            }
        })();

        return;
    }

    res.json({
        confirmation: 'fail',
        message: 'Invalid Action'
    });
});

module.exports = router;
