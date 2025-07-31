'use client';
import { useState } from 'react';
/* Image removed per request */

export default function NewsCard({ article }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [imgError, setImgError] = useState(false);
  // Normalize bad/empty image values to ensure a working fallback
  const imgSrc =
    !article?.image ||
    typeof article.image !== 'string' ||
    article.image.trim() === '' ||
    article.image.trim().toLowerCase() === 'null' ||
    article.image.trim().toLowerCase() === 'undefined'
      ? '/placeholder-news.jpg'
      : article.image.trim();
  
  // Format the date nicely
  const formattedDate = new Date(article.date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  // Remove HTML tags from description for clean text
  const cleanDescription = article.description.replace(/<[^>]*>?/gm, '');
  
  // Get first paragraph for preview
  const previewText = cleanDescription.split('\n')[0];

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-200">
      {/* Image removed: show a clean header area instead */}
      <div className="h-2 w-full bg-gray-100" />
      
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-xl font-bold text-gray-900 flex-1">
            {article.title}
          </h3>
        </div>

        <p className="text-sm text-gray-500 mb-4">
          {formattedDate}
        </p>

        <div className={`prose prose-sm max-w-none ${isExpanded ? '' : 'line-clamp-3'}`}>
          <p>{isExpanded ? cleanDescription : previewText}</p>
        </div>

        <div className="mt-4 flex items-center justify-between">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-primary hover:text-accent transition-colors"
          >
            {isExpanded ? 'Show Less' : 'Read More'}
          </button>

          <a
            href={article.link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center text-primary hover:text-accent transition-colors"
          >
            Visit Article
            <svg
              className="ml-2 w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
              />
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
}
