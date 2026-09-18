import { site } from '../data/site';

const PRODUCTION_ORIGIN = 'https://prathamshah.in';

function profileUrls(): string[] {
  const urls = new Set<string>();
  for (const link of [...site.contact, ...site.elsewhere]) {
    if (link.href.startsWith('http')) urls.add(link.href);
  }
  urls.add(`${PRODUCTION_ORIGIN}/`);
  return [...urls];
}

export function buildPersonJsonLd(origin: string): Record<string, unknown> {
  const url = origin.replace(/\/$/, '') || PRODUCTION_ORIGIN;
  const blink = site.experience[0];
  const pdeu = site.education.find((e) => e.logo === 'pdeu');
  const bits = site.education.find((e) => e.logo === 'bits');

  const alumniOf = [pdeu, bits]
    .filter(Boolean)
    .map((school) => ({
      '@type': 'CollegeOrUniversity',
      name: school!.school,
    }));

  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Pratham Shah',
    url,
    email: 'contact@prathamshah.in',
    jobTitle: blink?.role ?? 'Software Engineer',
    worksFor: blink
      ? { '@type': 'Organization', name: blink.company }
      : undefined,
    alumniOf: alumniOf.length ? alumniOf : undefined,
    sameAs: profileUrls().filter((href) => href !== `${url}/`),
    knowsAbout: [
      'Software engineering',
      'Machine learning',
      'Large language models',
      'Full-stack web development',
      'Computer vision',
    ],
    description: site.description,
  };
}

export function buildWebSiteJsonLd(origin: string): Record<string, unknown> {
  const url = origin.replace(/\/$/, '') || PRODUCTION_ORIGIN;
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Pratham Shah',
    alternateName: ['prathamshah.in', 'Pratham Shah portfolio'],
    url,
    description: site.description,
    inLanguage: 'en-IN',
    publisher: {
      '@type': 'Person',
      name: 'Pratham Shah',
      url,
    },
  };
}

export function buildProfilePageJsonLd(
  origin: string,
  pageUrl: string,
  pageTitle: string,
  pageDescription: string,
): Record<string, unknown> {
  const person = buildPersonJsonLd(origin);
  return {
    '@context': 'https://schema.org',
    '@type': 'ProfilePage',
    name: pageTitle,
    description: pageDescription,
    url: pageUrl,
    mainEntity: person,
    isPartOf: buildWebSiteJsonLd(origin),
  };
}
