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
    iso?: string;
    open: {
      title: string;
      days: string[];
    };
    navigation: {
      home?: string;
      menu?: string;
      about?: string;
      gallery?: string;
      group?: string;
      contact?: string;
      [key: string]: string | undefined;
    };
    wifi?: {
      title?: string;
    },
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
      online: string;
    };
    contact: {
      title?: string;
      map?: string;
      email?: string;
      card?: string;
      [key: string]: string | undefined;
    };
    company: {
      title?: string;
      vat?: string;
      reg?: string;
      bank?: string;
      bank_acc?: string;
      [key: string]: string | undefined;
    };
    groups: {
      title?: string;
      guide?: string;
      reservation?: string;
      faq: FAQ[];
    };
    reviews: {
      title?: string;
      people?: Review[]
    };
    faq: {
      title?: string;
      questions: FAQ2[];
    };
    menu: {
      drink?: {
        title?: string;
      };
      wine?: {
        title?: string;
      };
      food?: {
        title?: string;
        stars?: string;
        show?: string;
        price?: string
      };
      category: {
        [key: string]: string | undefined;
      };
      allergy: {
        [key: string]: string | undefined;
      };
    };
    parking?: {
      text?: string
    }
    about?: {
      text?: string;
    }
}

export interface Translates {
  current: TranslatesCurrent;
}