const sgMail = require('@sendgrid/mail');
const Promise = require('bluebird');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

module.exports = {
    sendEmails: (recipients, emailInfo, completion) => {
        let msg = {
            to: '',
            from: 'app163557149@heroku.com',
            subject: emailInfo.subject,
            text: emailInfo.content,
            html: emailInfo.html,
        };
        
        recipients.forEach( (recipient) => {
            msg.to = recipient.trim();
            sgMail
                .send(msg)
                .then(() => {
                })
                .catch(error => {
                });
        });

        completion();
    },

    sendEmail: (emailInfo) => {
        return new Promise( (resolve, reject) => {
            const msg = {
                to: emailInfo.recipient,
                from: 'app163557149@heroku.com',
                subject: emailInfo.subject,
                text: emailInfo.content,
                html: emailInfo.html,
            };
            
            sgMail
                .send(msg)
                .then(() => {
                    resolve('Success');
                })
                .catch(error => {
                    reject(error);
                });

            return;
        });
    }
}
