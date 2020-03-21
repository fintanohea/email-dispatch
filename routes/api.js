const express = require('express')
const utils = require('../utils')
const validator = require('validator')
const constants = require('../constants/constants')
const { body, validationResult, check } = require('express-validator')
const router = express.Router()

router.post('/:action',  
    [
        check(constants.SUBJECT_PARAM, constants.NO_SUBJECT_MESSAGE).not().isEmpty().trim().escape(),
        check(constants.HTML_PARAM, constants.NO_HTML_MESSAGE).not().isEmpty().trim().escape(),
        check(constants.CONTENT_PARAM, constants.NO_CONTENT_MESSAGE).not().isEmpty().trim().escape(),
        body(constants.RECIPIENTS_PARAM).custom(value => {
            if(!value){
                throw new Error(constants.NO_RECIPIENTS_MESSAGE) 
            } 

            let recipients = value.split(constants.EMAIL_SEPERATOR)
            recipients.forEach((recipient) => {
                if (!validator.isEmail(recipient.trim())) {
                    throw new Error(constants.INVALID_EMAIL_MESSAGE + recipient) 
                }
            })
            
            return true
        })
    ], 
    (req, res) => {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
          return res.status(422).json({ errors: errors.array() })
        }

        let action = req.params.action

        if (action === constants.SEND_ACTION) {
            utils.Email.sendEmail(req.body)
                .then( () => {
                    res.json({
                        confirmation: constants.SUCCESS,
                        message: constants.EMAILS_SENT_MESSAGE
                    })
                })
                .catch( err => {
                    res.json({
                        confirmation: constants.FAIL,
                        message: err
                    })
                });
            return
        }

        res.json({
            confirmation: constants.FAIL,
            message: constants.INVALID_ACTION_MESSAGE
        })
})

module.exports = router
