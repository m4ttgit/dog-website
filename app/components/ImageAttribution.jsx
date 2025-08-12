import React from 'react';
import { getImageAttribution } from '@/app/lib/imageAttribution';

export default function ImageAttribution({ breedName }) {
  const [attribution, setAttribution] = React.useState(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);

  React.useEffect(() => {
    async function loadAttribution() {
      try {
        if (!breedName || breedName === 'Unknown') {
          setLoading(false);
          return;
        }
        
        const data = await getImageAttribution(breedName);
        setAttribution(data);
      } catch (error) {
        console.error('Error loading attribution:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }
    loadAttribution();
  }, [breedName]);

  if (loading || error || !attribution) {
    return null;
  }
  
  if (!attribution.source || attribution.source === 'Unknown') {
    return null;
  }

  const attributionText = [];
  
  if (attribution.source && attribution.source !== 'Unknown') {
    attributionText.push(`Source: ${attribution.source}`);
  }
  
  if (attribution.attribution && attribution.attribution !== 'Unknown') {
    attributionText.push(`Attribution: ${attribution.attribution}`);
  }
  
  if (attribution.license && attribution.license !== 'Unknown') {
    attributionText.push(`License: ${attribution.license}`);
  }

  if (attributionText.length === 0) {
    return null;
  }

  return (
    <div className="text-xs text-gray-400 mt-2 opacity-70">
      {attribution.url ? (
        <a 
          href={attribution.url} 
          target="_blank" 
          rel="noopener noreferrer"
          className="hover:text-gray-600 transition-colors"
          title="View original image"
        >
          {attributionText.join(' | ')}
        </a>
      ) : (
        <span>{attributionText.join(' | ')}</span>
      )}
    </div>
  );
}
