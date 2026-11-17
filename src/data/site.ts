// Contact details and site-wide text. Edit here and every page updates.

export const site = {
  name: 'Andes Lodge Peru',
  tagline:
    'A local family-run guesthouse in the traditional Andean village of Yanama, next to the Huascaran National Park',
  description:
    'Family-run guesthouse in Yanama, Ancash, Peru, twenty minutes from the Huascaran National Park and surrounded by the peaks of the Cordillera Blanca.',
  whatsappMessage: 'Andes Lodge Peru reservation/info.',
  tripadvisor:
    'https://www.tripadvisor.co.uk/Hotel_Review-g1006870-d1007366-Reviews-Andes_Lodge_Peru-Yanama_Ancash_Region.html',
  /** Google reviews for the lodge. If you get a review link from your Google Business Profile, paste it here. */
  googleReviews:
    'https://www.google.com/travel/search?q=Andes%20Lodge%20Peru%20reviews&qs=CAEyFENnc0l4NUN4d0tUTnZ2bm9BUkFCOAJCCQlHSAxIavry6A&ap=ugEHcmV2aWV3cw',
  address: {
    display: 'Jr. Gran Chavin S/n, Yanama - Yungay - Ancash - Perú. 02162',
    street: 'Jr. Gran Chavin S/n',
    locality: 'Yanama',
    region: 'Ancash',
    postalCode: '02162',
    country: 'PE',
  },
};

export interface Phone {
  country: string;
  /** As shown to visitors */
  display: string;
  /** Digits only, with country code, no "+" (used for WhatsApp and tel: links) */
  number: string;
  languages: string;
}

export const phones: Phone[] = [
  { country: 'Peru', display: '+51 943 870 135', number: '51943870135', languages: 'Spanish' },
  { country: 'Peru', display: '+51 943 282 656', number: '51943282656', languages: 'Spanish' },
  { country: 'UK', display: '+44 741 191 4423', number: '447411914423', languages: 'Spanish and English' },
  { country: 'Italy', display: '+39 347 990 8735', number: '393479908735', languages: 'Spanish and Italian' },
];

export const whatsappLink = (number: string) =>
  `https://wa.me/${number}?text=${encodeURIComponent(site.whatsappMessage)}`;

export const nav = [
  { label: 'Home', href: '/' },
  { label: 'Rooms & Prices', href: '/rooms-suites' },
  { label: 'Lodge Amenities', href: '/amenities' },
  { label: 'Local area', href: '/local-area' },
  { label: 'Gallery', href: '/gallery' },
];
