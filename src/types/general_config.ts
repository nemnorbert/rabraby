type Alert = {
    color: string;
    message: string;
};
  
type ContactInfo = {
    link: string;
    icon: string;
    base?: boolean;
    social?: boolean;
    blank?: boolean;
    href?: string;
    reservation?: boolean;
};
  
type CompanyData = {
    vat: string;
    reg: string;
    bank: string;
    bank_acc: string;
    IBAN: string;
    SWIFT: string;
};
  
export type Config = {
    languages?: string[];
    alerts?: {
      [key: string]: Alert[];
    };
    paths: {
      [key: string]: {
        path: string;
        main?: boolean;
      };
    };
    home: {
      btns: {
        [key: string]: string;
      };
    };
    contact: {
      map: ContactInfo;
      phone: ContactInfo;
      email: ContactInfo;
      facebook: ContactInfo;
      card: ContactInfo;
    };
    company: {
        name: string;
        data: CompanyData;
    };
    menu: {
        categories: string[];
        allergy: string[];
    }
};