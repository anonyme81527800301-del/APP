import Constants from 'expo-constants';
import { ItemOffersMap, StoreMeta, StoreOffer } from '../types';
import { MONTREAL_STORE_METAS } from '../data/stores';

const GOOGLE_API_URL = 'https://www.googleapis.com/customsearch/v1';

type GoogleResultItem = {
  title?: string;
  link?: string;
  snippet?: string;
  pagemap?: any;
  displayLink?: string;
};

type SearchResponse = {
  items?: GoogleResultItem[];
};

function getConfig() {
  const extra = (Constants?.expoConfig as any)?.extra || {};
  return {
    apiKey: extra.GOOGLE_API_KEY as string | undefined,
    cx: extra.GOOGLE_CSE_ID as string | undefined,
  };
}

function parsePriceFromText(text: string): number | null {
  const cleaned = text.replace(/,/g, '.');
  const match = cleaned.match(/\$\s?(\d+(?:\.\d{1,2})?)/);
  if (match) return Number(match[1]);
  const match2 = cleaned.match(/(\d+(?:\.\d{1,2})?)\s?\$/);
  if (match2) return Number(match2[1]);
  return null;
}

function filterToStores(items: GoogleResultItem[], stores: StoreMeta[]): StoreOffer[] {
  const offers: StoreOffer[] = [];
  for (const it of items) {
    if (!it.link || !it.title) continue;
    const matchStore = stores.find((s) => it.link!.includes(s.domain) || it.displayLink?.includes(s.domain));
    if (!matchStore) continue;

    const priceFromTitle = parsePriceFromText(it.title);
    const priceFromSnippet = it.snippet ? parsePriceFromText(it.snippet) : null;
    const price = priceFromTitle ?? priceFromSnippet;
    if (price == null) continue;

    offers.push({ storeName: matchStore.name, price, url: it.link });
  }
  return offers;
}

export async function fetchGoogleOffers(queries: string[], stores: StoreMeta[] = MONTREAL_STORE_METAS): Promise<ItemOffersMap> {
  const { apiKey, cx } = getConfig();
  if (!apiKey || !cx) {
    return Object.fromEntries(queries.map((q) => [q, []]));
  }

  const results: ItemOffersMap = {};
  await Promise.all(
    queries.map(async (q) => {
      const siteFilter = stores.map((s) => `site:${s.domain}`).join(' OR ');
      const url = `${GOOGLE_API_URL}?key=${encodeURIComponent(apiKey)}&cx=${encodeURIComponent(cx)}&q=${encodeURIComponent(`${q} (${siteFilter}) Montreal`)}`;
      try {
        const resp = await fetch(url);
        const data = (await resp.json()) as SearchResponse;
        const items = data.items ?? [];
        results[q] = filterToStores(items, stores).sort((a, b) => a.price - b.price);
      } catch (e) {
        results[q] = [];
      }
    })
  );
  return results;
}
