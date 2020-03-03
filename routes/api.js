const express = require('express');
const utils = require('../utils');
const router = express.Router();

router.post('/:action', function(req, res, next) {
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
