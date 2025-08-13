import { NextResponse } from "next/server";
import Parser from 'rss-parser';

const parser = new Parser();

export async function GET() {
  try {
    const feed = await parser.parseURL('https://www.goodnewsnetwork.org/category/news/animals/feed/');
    const news = feed.items.map(item => ({
      id: item.guid || item.link,
      title: item.title,
      description: item.content || item.description,
      publishedAt: item.pubDate,
      link: item.link,
      image: item['media:content']?.$.url || 
            item.content?.match(/src="([^"]+)"/)?.at(1) ||
            '/placeholder-news.jpg'
    }));
    
    return NextResponse.json(news, {
      headers: {
        'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400'
      }
    });
  } catch (error) {
    console.error('News API error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch news' },
      { status: 500 }
    );
  }
}
