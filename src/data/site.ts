// Studio-wide details. Everything legal on the site (footer, Privacy, Terms,
// Support) reads from here, so change a detail once and it updates everywhere.

export const site = {
  name: 'Little Brains',
  url: 'https://littlebrains.co',
  domain: 'littlebrains.co',
  tagline: 'Games for little brains.',
  description:
    'Little Brains makes entertaining, engaging and challenging games for children on iPhone and iPad. No ads, no tracking, no accounts.',

  // Shown in the footer, Privacy and Terms.
  owner: 'Ido Amoyal',
  address: null as string | null,

  email: 'support.littlebrains@gmail.com',
  replyTime: 'two working days',
  country: 'the United Kingdom',
  governingLaw: 'England and Wales',

  // Optional App Store campaign provider token (the pt= value).
  appStoreProviderToken: '',

  legalUpdated: '17 November 2026',
  founded: 2026,
};

export const nav = [
  { href: '/#shelf', label: 'Games' },
  { href: '/#grown-ups', label: 'For grown-ups' },
  { href: '/support/', label: 'Help' },
];

export const footerNav = [
  { href: '/games/', label: 'Games' },
  { href: '/support/', label: 'Support' },
  { href: '/privacy/', label: 'Privacy' },
  { href: '/terms/', label: 'Terms' },
  { href: '/press/', label: 'Press' },
];
