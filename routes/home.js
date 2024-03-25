const express = require('express');
const router = express.Router();
const { socialBtn, faqDiv, companyTrans } = require('../utils/functions');

router.get('/', async (req, res, next) => {
    try {
        const data = {
            title: "Teszt",
            socialDiv: socialBtn(),
            faqDiv: faqDiv(),
            companyDiv: companyTrans(),
        };

        res.render('home', { data });
    } catch (error) {
        console.log(error);
    }
});

module.exports = router;