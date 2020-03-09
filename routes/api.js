const express = require('express');
const utils = require('../utils');
const validator = require('validator');
const { body, validationResult, check } = require('express-validator');
const router = express.Router();

router.post('/:action',  
    [
        check('subject', 'No subject provided').not().isEmpty().trim().escape(),
        check('html', 'No html provided').not().isEmpty().trim().escape(),
        check('content', 'No content provided').not().isEmpty().trim().escape(),
        body('recipients').custom(value => {
            if(!value){
                throw new Error('No recipients provided'); 
            } 

            let recipients = value.split(',');
            recipients.forEach((recipient) => {
                if (!validator.isEmail(recipient.trim())) {
                    throw new Error('Invalid email provided: ' + recipient); 
                }
            });
            
            return true;
        })
            
    ], 
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(422).json({ errors: errors.array() });
        }

        let action = req.params.action;

        if (action === 'send') {
            let recipients = req.body.recipients.split(',');

            utils.Email.sendEmails(recipients, req.body, () => {
                res.json({
                    confirmation: 'success',
                    message: 'Emails Sent!'
                });
            });

            return;
        }

        res.json({
            confirmation: 'fail',
            message: 'Invalid Action'
        });
});


module.exports = router;
