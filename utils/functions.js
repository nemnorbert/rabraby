const lang = 'hu';
const config = require('../config');
const translate = require(`../translates/${lang}`);

const faqDiv = () => {
    const array = translate.faq.questions;
    let result = '';
    array.forEach(item => {
        result += `<details>
            <summary>${item.question}</summary>
            <p>${item.answer}</p>
        </details>`;
    });
    return `<div class="title">${translate.faq.title}</div> ${result}`;
}

const companyBuilder = () => {
    const company = config?.company;
    if (!company) { return; }
    let result = `<div class="title">${translate?.company?.title}</div>
    <b>${company?.name}</b>`;

    for (let key in company?.data) {
        const title = translate?.company?.[key] ?? key;
        result += `<div>
            <b>${title}:</b>
            <p>${company?.data?.[key]}</p>
        </div>`;
    }
    
    return result;
}

const contactBuilder = () => {
    const contact = config?.contact;
    let result = `<div class="title">${translate?.contact?.title}</div>`;

    for (let key in contact) {
        if (contact?.[key]?.base) {
            const link = contact?.[key]?.link;
            let title = translate?.contact?.[key] ?? key;
            if (link.startsWith('+36')) { title = link; }

            const icon = contact?.[key]?.icon;
            title = `<i class="bi bi-${icon}"></i> ${title}`;

            const url = contact?.[key]?.href ? null : link;
            result += url ? `<a target="_blank" href="${url}">${title}</a>` : `<div class='link'>${title}</div>`;
        }
    }
    return result;
}

module.exports = { faqDiv, companyBuilder, contactBuilder };