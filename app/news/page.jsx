import { getNews } from '@/app/api/news';
import NewsCard from '@/app/components/NewsCard';
import ErrorMessage from '@/app/components/ErrorMessage';

export const revalidate = 3600; // Revalidate every hour

// Decode common HTML entities found in RSS/feeds (e.g., &#8230;, &#8217;)
function decodeHtml(str = "") {
  if (!str) return "";
  // Handle numeric entities (decimal and hex)
  let s = str
    .replace(/&#(\d+);/g, (_, dec) => {
      try { return String.fromCharCode(parseInt(dec, 10)); } catch { return _; }
    })
    .replace(/&#x([0-9a-fA-F]+);/g, (_, hex) => {
      try { return String.fromCharCode(parseInt(hex, 16)); } catch { return _; }
    });

  // Handle common named entities
  const named = {
    "&amp;": "&",
    "&lt;": "<",
    "&gt;": ">",
    "&quot;": "\"",
    "&apos;": "'",
    "&nbsp;": " ",
    "&hellip;": "…",
    "&rsquo;": "'",
    "&lsquo;": "'",
    "&rdquo;": "\"",
    "&ldquo;": "\"",
    "&mdash;": "—",
    "&ndash;": "–",
  };
  s = s.replace(
    /&(amp|lt|gt|quot|apos|nbsp|hellip|rsquo|lsquo|rdquo|ldquo|mdash|ndash);/g,
    (m) => named[m] ?? m
  );

  return s;
}

// Normalize an article object: decode text fields and ensure image presence
function normalizeArticle(raw = {}) {
  const image =
    raw.image ||
    raw.imageUrl ||
    raw.urlToImage ||
    raw.enclosure?.url ||
    "/placeholder-news.jpg";

  return {
    ...raw,
    title: decodeHtml(raw.title || ""),
    description: decodeHtml(raw.description || raw.summary || ""),
    content: decodeHtml(raw.content || ""),
    image, // provide stable 'image' field for cards
  };
}

/**
 * Filter helper to determine if an article is dog-related.
 * Uses allowlist with word boundaries and a denylist for common false positives.
 */
function isDogRelated(article) {
  const text = [
    article?.title || "",
    article?.description || "",
    article?.content || "",
    article?.source?.name || "",
  ]
    .join(" ")
    .toLowerCase();

  // Quick exit if nothing meaningful
  if (!text.trim()) return false;

  // Denylist to reduce false positives
  const denylist = [
    "hotdog",
    "hot dog",
    "watchdog",
    "dogecoin",
    "georgia bulldogs",
    "fresno state bulldogs",
    "butler bulldogs",
    "uconn huskies",
    "washington huskies",
    "bulldogs vs",
    "huskies vs",
  ];
  for (const bad of denylist) {
    if (text.includes(bad)) return false;
  }

  // Allowlist: general dog terms, roles, and common breed group names
  const allowlistPatterns = [
    "\\bdog\\b",
    "\\bdogs\\b",
    "\\bpuppy\\b",
    "\\bpuppies\\b",
    "\\bcanine\\b",
    "\\bcanines\\b",
    "\\bkennel\\b",
    "\\bkennels\\b",
    "\\bbreed\\b",
    "\\bbreeds\\b",
    "\\bakc\\b",
    "\\bamerican kennel club\\b",
    "\\bservice dog\\b",
    "\\btherapy dog\\b",
    "\\bguide dog\\b",
    "\\bpet dog\\b",
    // group/breeds (broad)
    "\\bhound\\b",
    "\\bhounds\\b",
    "\\bterrier\\b",
    "\\bterriers\\b",
    "\\bretriever\\b",
    "\\bretrievers\\b",
    "\\bshepherd\\b",
    "\\bshepherds\\b",
    "\\bbulldog\\b",
    "\\bbulldogs\\b", // allow but denylist tries to catch sports
    "\\bpoodle\\b",
    "\\bpoodles\\b",
    "\\bpointer\\b",
    "\\bpointers\\b",
    "\\bspaniel\\b",
    "\\bspaniels\\b",
    "\\bcollie\\b",
    "\\bcollies\\b",
    "\\bshiba inu\\b",
    "\\bakita\\b",
    "\\bhusky\\b",
    "\\bhuskies\\b", // allow but denylist tries to catch sports
    "\\bchihuahua\\b",
    "\\bpug\\b",
    "\\bbeagle\\b",
    "\\bdachshund\\b",
    "\\brottweiler\\b",
    "\\bdoberman\\b",
    "\\bmalinois\\b",
    "\\bgolden retriever\\b",
    "\\blabrador\\b",
    "\\blabrador retriever\\b",
  ];

  const allowRegex = new RegExp(allowlistPatterns.join("|"), "i");
  return allowRegex.test(text);
}

export default async function NewsPage() {
  let articles = [];
  let error = null;

  try {
    articles = await getNews();

    // Normalize and filter to dog-related
    if (Array.isArray(articles)) {
      articles = articles.map(normalizeArticle).filter(isDogRelated);
    } else {
      articles = [];
    }

    if (!articles || articles.length === 0) {
      // No dog-related news found; not an error with fetch, but present an empty state
      error = null;
    }
  } catch (e) {
    error = "Error fetching news articles. Please try again later.";
    console.error('News fetch error:', e);
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-primary to-accent py-16 px-8 rounded-xl mb-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-text">
          Latest Dog News
        </h1>
        <p className="text-lg md:text-xl max-w-2xl text-text">
          Stay updated with heartwarming stories and important news about our furry friends.
        </p>
      </div>

      {/* Error Message */}
      {error && <ErrorMessage message={error} />}

      {/* News Grid */}
      {!error && (
        <>
          {articles.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
              {articles.map((article) => (
                <NewsCard key={article.id ?? `${article?.title}-${article?.publishedAt ?? Math.random()}` } article={article} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="mx-auto max-w-2xl">
                <h2 className="text-2xl font-semibold mb-2">No dog-related news right now</h2>
                <p className="text-gray-600">
                  We couldn't find any articles specifically about dogs at the moment. Please check back later.
                </p>
              </div>
            </div>
          )}

          {/* RSS Attribution */}
          <div className="text-center text-gray-500 text-sm mb-12">
            News provided by GoodNewsNetwork - Animals Category
            <br />
            <a
              href="https://www.goodnewsnetwork.org/category/news/animals/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:text-accent transition-colors"
            >
              Visit Source →
            </a>
          </div>
        </>
      )}
    </div>
  );
}