export type MediumPost = {
  title: string;
  link: string;
  pubDate: string;
  year: string;
  excerpt: string;
};

// Set this once a Medium account exists, e.g. "bhushangowda" (from medium.com/@bhushangowda).
// Publications falls back to a static list until this is set.
const MEDIUM_USERNAME = "";

function stripHtml(html: string) {
  return html
    .replace(/<[^>]*>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function decodeEntities(str: string) {
  return str
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&#39;/g, "'")
    .replace(/&quot;/g, '"');
}

function extractTag(block: string, tag: string): string {
  const match = block.match(new RegExp(`<${tag}>([\\s\\S]*?)</${tag}>`, "i"));
  if (!match) return "";
  const value = match[1].trim();
  const cdataMatch = value.match(/^<!\[CDATA\[([\s\S]*?)\]\]>$/);
  return cdataMatch ? cdataMatch[1] : value;
}

export async function getMediumPosts(limit = 4): Promise<MediumPost[] | null> {
  if (!MEDIUM_USERNAME) return null;

  try {
    const res = await fetch(`https://medium.com/feed/@${MEDIUM_USERNAME}`, {
      next: { revalidate: 3600 },
    });
    if (!res.ok) return null;

    const xml = await res.text();
    const items = xml.match(/<item>[\s\S]*?<\/item>/g) ?? [];
    if (items.length === 0) return null;

    return items.slice(0, limit).map((block) => {
      const title = decodeEntities(extractTag(block, "title"));
      const link = extractTag(block, "link").split("?")[0];
      const pubDate = extractTag(block, "pubDate");
      const content = extractTag(block, "content:encoded");
      const year = pubDate ? String(new Date(pubDate).getFullYear()) : "";
      const excerpt = decodeEntities(stripHtml(content)).slice(0, 140).trim() + "…";

      return { title, link, pubDate, year, excerpt };
    });
  } catch {
    return null;
  }
}
