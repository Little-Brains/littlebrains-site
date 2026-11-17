// Every game is one JSON file in src/data/games/. Add a file and the game
// appears on the shelf, in /games, on Support, Privacy and the sitemap.
// "status": "coming-soon" makes a placeholder box with no page.
import { site } from '../data/site';

export interface Faq { id: string; group: string; q: string; a: string }
export interface Game {
  slug: string;
  order: number;
  status: 'released' | 'coming-soon';
  name: string;
  accent: string;
  storeName?: string;
  tagline?: string;
  summary?: string;
  ages?: string;
  accentDeep?: string;
  roundel?: { big: string; small: string };
  art?: { base: string; alt: string };
  appStoreId?: string;
  bundleId?: string;
  priceLine?: string;
  steps?: { title: string; text: string }[];
  helpers?: string[];
  facts?: { label: string; value: string }[];
  accessibility?: string;
  privacy?: { stored: string[]; notes: string[] };
  faq?: Faq[];
  topQuestions?: string[];
}

const files = import.meta.glob<{ default: Game }>('../data/games/*.json', { eager: true });

export const allGames: Game[] = Object.values(files)
  .map((m) => m.default)
  .sort((a, b) => a.order - b.order);

export const releasedGames = allGames.filter((g) => g.status === 'released');

export const gameUrl = (g: Game) => `/games/${g.slug}/`;

/** App Store link with a campaign name, so downloads can be counted per spot. */
export function appStoreUrl(g: Game, campaign: string): string | null {
  if (!g.appStoreId) return null;
  const id = g.appStoreId.replace(/^id/, '');
  const base = `https://apps.apple.com/app/apple-store/id${id}`;
  if (!site.appStoreProviderToken) return base;
  const ct = `${g.slug}-${campaign}`.slice(0, 40);
  return `${base}?pt=${encodeURIComponent(site.appStoreProviderToken)}&ct=${encodeURIComponent(ct)}&mt=8`;
}

/** Questions grouped in the order they first appear. */
export function faqGroups(g: Game): { group: string; items: Faq[] }[] {
  const out: { group: string; items: Faq[] }[] = [];
  for (const item of g.faq ?? []) {
    let grp = out.find((x) => x.group === item.group);
    if (!grp) out.push((grp = { group: item.group, items: [] }));
    grp.items.push(item);
  }
  return out;
}
