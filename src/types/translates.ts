export interface Review {
    name: string;
    title?: string;
    text: string;
}
  
interface FAQ2 {
    question: string;
    answer: string;
}

interface FAQ {
  q: string;
  a: string;
}
  
export interface TranslatesCurrent {
    iso: string;
    navigation: {
      home?: string;
      menu?: string;
      about?: string;
      gallery?: string;
      group?: string;
      contact?: string;
    };
    home: {
      title: string;
      description: string;
      buttons: {
        card: string;
        garden: string;
        dog: string;
        wifi: string;
      };
    };
    reservation: {
      title: string;
      phone: string;
      online: string;
    };
    contact: {
      title: string;
      map: string;
      email: string;
      card: string;
    };
    company: {
      title?: string;
      vat?: string;
      reg?: string;
      bank?: string;
      bank_acc?: string;
    };
    groups: {
      faq: FAQ[];
    };
    reviews: Review[];
    faq: {
      title: string;
      questions: FAQ2[];
    };
}

export interface Translates {
  current: TranslatesCurrent;
}