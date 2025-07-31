import Parser from 'rss-parser';

const parser = new Parser();

export async function getNews() {
  try {
    const feed = await parser.parseURL('https://www.goodnewsnetwork.org/category/news/animals/feed/');
    return feed.items.map(item => ({
      id: item.guid || item.link,
      title: item.title,
      description: item.content || item.description,
      date: item.pubDate,
      link: item.link,
      image: item['media:content']?.$.url || 
            item.content?.match(/src="([^"]+)"/)?.at(1) ||
            '/placeholder-news.jpg'
    }));
  } catch (error) {
    console.error('Error fetching news:', error);
    return [];
  }
}