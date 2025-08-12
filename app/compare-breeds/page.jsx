'use client';

import React, { useState, useEffect } from 'react';
import { getAllAttributions } from '@/app/lib/imageAttribution';

export default function CompareBreedsPage() {
  const [breeds, setBreeds] = useState([]);
  const [attributions, setAttributions] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadData() {
      try {
        // Load breeds from API
        const breedsResponse = await fetch('/api/breeds');
        if (!breedsResponse.ok) {
          throw new Error(`HTTP error! status: ${breedsResponse.status}`);
        }
        const breedsData = await breedsResponse.json();
        setBreeds(breedsData);

        // Load attributions from CSV
        const attributionData = await getAllAttributions();
        setAttributions(attributionData);
      } catch (err) {
        console.error('Error loading data:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  // Get breed names from API
  const apiBreedNames = breeds.map(breed => breed.breed || breed.name || 'Unknown').filter(name => name !== 'Unknown');
  
  // Get breed names from CSV
  const csvBreedNames = Object.keys(attributions);

  // Find matches
  const matches = apiBreedNames.filter(name => csvBreedNames.includes(name));
  
  // Find API breeds not in CSV
  const apiOnly = apiBreedNames.filter(name => !csvBreedNames.includes(name));
  
  // Find CSV breeds not in API
  const csvOnly = csvBreedNames.filter(name => !apiBreedNames.includes(name));

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Breed Names Comparison</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="bg-green-100 p-4 rounded">
          <h2 className="text-lg font-semibold text-green-800">Matches ({matches.length})</h2>
          <p>Breeds found in both API and CSV</p>
        </div>
        <div className="bg-yellow-100 p-4 rounded">
          <h2 className="text-lg font-semibold text-yellow-800">API Only ({apiOnly.length})</h2>
          <p>Breeds in API but not in CSV</p>
        </div>
        <div className="bg-blue-100 p-4 rounded">
          <h2 className="text-lg font-semibold text-blue-800">CSV Only ({csvOnly.length})</h2>
          <p>Breeds in CSV but not in API</p>
        </div>
      </div>

      <div className="space-y-6">
        {/* Matches */}
        {matches.length > 0 && (
          <div>
            <h2 className="text-xl font-semibold mb-2">Matches:</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
              {matches.map((name, index) => (
                <div key={index} className="bg-green-50 p-2 rounded border border-green-200">
                  {name}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* API Only */}
        {apiOnly.length > 0 && (
          <div>
            <h2 className="text-xl font-semibold mb-2">API Only:</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
              {apiOnly.map((name, index) => (
                <div key={index} className="bg-yellow-50 p-2 rounded border border-yellow-200">
                  {name}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* CSV Only */}
        {csvOnly.length > 0 && (
          <div>
            <h2 className="text-xl font-semibold mb-2">CSV Only:</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
              {csvOnly.map((name, index) => (
                <div key={index} className="bg-blue-50 p-2 rounded border border-blue-200">
                  {name}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
