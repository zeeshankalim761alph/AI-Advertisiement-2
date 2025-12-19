export enum Platform {
  Facebook = 'Facebook',
  Instagram = 'Instagram',
  GoogleAds = 'Google Ads',
  YouTube = 'YouTube',
  WhatsApp = 'WhatsApp'
}

export enum Tone {
  Professional = 'Professional',
  Friendly = 'Friendly',
  Emotional = 'Emotional',
  Funny = 'Funny',
  Luxury = 'Luxury'
}

export enum Language {
  English = 'English',
  Urdu = 'Urdu'
}

export interface AdFormData {
  productName: string;
  category: string;
  audience: string;
  platform: Platform;
  tone: Tone;
  language: Language;
}

export interface AdCopy {
  headline: string;
  body: string;
  cta: string;
  hashtags: string[];
}
