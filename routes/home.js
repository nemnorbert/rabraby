const express = require('express');
const router = express.Router();
const { iconBuild, checkAlert, faqDiv, companyBuilder, contactBuilder } = require('../utils/functions');

router.get('/', async (req, res, next) => {
    try {
        const data = {
            title: "Teszt",
            faqDiv: faqDiv(),
            alertDiv: checkAlert(),
            companyDiv: companyBuilder(),
            contactDiv: contactBuilder(),
            onlineRes: iconBuild('reservation'),
        };

        res.render('home', { data });
    } catch (error) {
        console.log(error);
    }
});

module.exports = router;