interface Alert {
    color: string;
    message: string;
  }
  
  interface NavigationLink {
    link: string;
  }
  
  interface ContactLink {
    link: string;
    base?: boolean;
    blank?: boolean;
    href?: string;
    social?: boolean;
    reservation?: boolean;
  }
  
  interface CompanyData {
    vat: string;
    reg: string;
    bank: string;
    bank_acc: string;
    IBAN: string;
    SWIFT: string;
  }
  
export interface Config {
    alerts: {
      hu: Alert[];
    };
    languages: string[];
    navigation: {
      home: NavigationLink;
      menu: NavigationLink;
      about: NavigationLink;
      gallery?: NavigationLink;
      group: NavigationLink;
      contact: NavigationLink;
    };
    contact: {
      map: ContactLink;
      phone: ContactLink;
      email: ContactLink;
      facebook: ContactLink;
      instagram: ContactLink;
      card: ContactLink;
    };
    company: {
      name: string;
      data: CompanyData;
    };
}