const express = require('express');
const router = express.Router();
const { faqDiv, companyBuilder, contactBuilder } = require('../utils/functions');

router.get('/', async (req, res, next) => {
    try {
        const data = {
            title: "Teszt",
            faqDiv: faqDiv(),
            companyDiv: companyBuilder(),
            contactDiv: contactBuilder(),
        };

        res.render('home', { data });
    } catch (error) {
        console.log(error);
    }
});

module.exports = router;