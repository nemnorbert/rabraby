const config = require('../config');
const translate = require('../translates/hu');

const socialBtn = () => {
    const obj = config?.contact;
    let result = '';
    Object.keys(obj).forEach(key => {
        const value = obj[key];
        console.log(key);
        console.log(value);
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

module.exports = { socialBtn, faqDiv };