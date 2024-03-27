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

const checkAlert = () => {
    const alert = translate?.alert;
    if (!alert) {return}
    return `<div class="alert">${alert}</div>`;   
}

const iconBuild = (type) => {
    const contacts = config?.contact;
    let result = `<div class="social">`;

    for (let key in contacts) {
        const contact = contacts[key];
        if (contact?.[type]) {
            let { icon, link, href } = contact;
            link = href ? `${href}:${link}` : link;
            const title = `<i class="bi bi-${icon}"></i>`;
            result += `<a target="_blank" href="${link}">${title}</a>`;
        }
    }

    return result + '</div>';
}

const contactBuilder = () => {
    const contacts = config?.contact;
    let result = `<div class="title">${translate?.contact?.title}</div>`;

    for (let key in contacts) {
        const contact = contacts[key];
        if (contact.base) {
            let { icon, link, href } = contact;
            let title = translate?.contact?.[key] ?? key;

            if (href) {
                title = link;
                link = `${href}:${link}`;
            }
            
            title = `<i class="bi bi-${icon}"></i> ${title}`;
            result += `<a target="_blank" href="${link}">${title}</a>`;
        }
    }

    return result + iconBuild('social');
}

module.exports = { iconBuild, checkAlert, faqDiv, companyBuilder, contactBuilder };