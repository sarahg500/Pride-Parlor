const express = require('Express');
const Concerns = require('../models/concern');
const router = new express.Router();

router.post('/concerns', async (req,res) => {
    const concern = new User(req.body);
    try {
        await user.save();
        res.status(201).send(concern);
    } catch (e) {
        res.status(400).send(e);
    }
});

module.exports = router;