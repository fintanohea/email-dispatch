const sgMail = require('@sendgrid/mail')
const Promise = require('bluebird')
const constants = require('../constants/constants')
sgMail.setApiKey(process.env.SENDGRID_API_KEY)

module.exports = {
    sendEmails: (recipients, emailInfo, completion) => {
        let msg = {
            to: constants.EMPTY_STRING_VALUE,
            from: constants.SENDING_EMAIL_ADDRESS,
            subject: emailInfo.subject,
            text: emailInfo.content,
            html: emailInfo.html,
        }
        
        recipients.forEach( (recipient) => {
            msg.to = recipient.trim()
            sgMail
                .send(msg)
                .then(() => {
                })
                .catch(error => {
                })
        })

        completion()
    },

    sendEmail: (emailInfo) => {
        return new Promise( (resolve, reject) => {
            const msg = {
                to: emailInfo.recipient,
                from: constants.SENDING_EMAIL_ADDRESS,
                subject: emailInfo.subject,
                text: emailInfo.content,
                html: emailInfo.html,
            }
            
            sgMail
                .send(msg)
                .then(() => {
                    resolve(constants.SUCCESS)
                })
                .catch(error => {
                    reject(error)
                })

            return
        })
    }
}
