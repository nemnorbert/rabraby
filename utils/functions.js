const lang = 'hu';
const config = require('../config');
const translate = require(`../translates/${lang}`);

const socialBtn = () => {
    const obj = config?.contact;
    let result = '';
    Object.keys(obj).forEach(key => {
        const value = obj[key];
        result += `<img src="/img/icons/${key}.svg" loading="lazy" alt="">`;
    });
    return result;
};

const faqDiv = () => {
    const array = translate.faq.questions;
    let result = '';
    array.forEach(item => {
        result += `<details>
            <summary>${item.question}</summary>
            <p>${item.answer}</p>
        </details>`;
    });
    return `<h2>${translate.faq.title}</h2> ${result}`;
}

const companyTrans = () => {
    const company = config?.company;
    if (!company) { return; }
    let result = '<h3>Rab Ráby Kft.</h3>';

    for (let key in company) {
        console.log(`${key}: ${company[key]}`);
        const title = translate.company[key] ?? key;
        result += `<div>
            <b>${title}:</b>
            <p>${company[key]}</p>
        </div>`;
    }
    
    return result;
}

module.exports = { socialBtn, faqDiv, companyTrans };