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

const companyBuilder = () => {
    const company = config?.company;
    if (!company) { return; }
    let result = `<h2>${translate?.company?.title}</h2>
    <h3>${company?.name}</h3>`;

    for (let key in company?.data) {
        const title = translate?.company?.[key] ?? key;
        result += `<div>
            <b>${title}:</b>
            <p>${company?.data?.[key]}</p>
        </div>`;
    }
    
    return result;
}

const socialBuild = (type) => {
    const contact = config?.contact;
    let result = ``;

    for (let key in contact) {
        if (contact?.[key]?.base) {
            let title = translate?.contact?.[key] ?? key;
            const icon = contact?.[key]?.icon;
            title = `<i class="bi bi-${icon}"></i> ${title}`;

            const link = contact?.[key]?.href ? null : contact?.[key]?.link;
            result += link ? `<a target="_blank" href="${link}">${title}</a>` : `<div>${title}</div>`;
        }
    }
    return result;
}

const contactBuilder = () => {
    const contact = config?.contact;
    let result = ``;

    for (let key in contact) {
        if (contact?.[key]?.base) {
            let title = translate?.contact?.[key] ?? key;
            const icon = contact?.[key]?.icon;
            title = `<i class="bi bi-${icon}"></i> ${title}`;

            const link = contact?.[key]?.href ? null : contact?.[key]?.link;
            result += link ? `<a target="_blank" href="${link}">${title}</a>` : `<div>${title}</div>`;
        }
    }
    return result;
}

module.exports = { socialBtn, faqDiv, companyBuilder, contactBuilder };