import type { Config } from "~/types/config";

const config : Config = {
    alerts: {
        hu: [
            {color: "green", message: "Üdvözöljük új weboldalunkon!"}
        ],
    },
    languages: [
        "hu", 
        "en", 
        //"de",
        //"it",
        //"zh",
    ],
    navigation: {
        home: { link:"/" },
        menu: { link: "/menu/" },
        about: { link: "/about/" },
        group: { link: "/group/" },
        contact: { link: "/contact/" },
    },
    contact: {
        map: {
            link: 'https://g.page/rabraby?gm', 
            base: true,
            blank: true,
        },
        phone: {
            link: '+36209149737',
            base: true,
            href: 'tel'
        },
        email: {
            link: 'info@rabraby.hu', 
            base: true, 
            href: 'mailto',
            reservation: true
        },
        facebook: {
            link: 'https://www.facebook.com/rabraby.hu', 
            social: true,
            reservation: true,
            blank: true,
        },
        instagram: {
            link: 'https://www.instagram.com/rabraby.hu',
            social: true,
            reservation: true,
            blank: true,
        },
        card: {
            link: 'https://adanor.eu/c/rabraby',
            base: true,
            blank: true,
        }
    },
    company: {    
        name: "Rab Ráby Kft.",
        data: {
            vat: '12134469-2-13',
            reg: '13-09-072 136',
            bank: 'K&H Bank',
            bank_acc: '10403112-50526587-67851007',
            IBAN: 'HU85-10403112-50526587-67851007',
            SWIFT: 'OKHBHUHB',
        }
    }
};

export default config;