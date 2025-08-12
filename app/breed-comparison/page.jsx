'use client';

import React, { useState, useEffect } from 'react';

export default function BreedComparisonPage() {
  const [apiBreeds, setApiBreeds] = useState([]);
  const [csvBreeds, setCsvBreeds] = useState([]);
  const [comparison, setComparison] = useState({
    onlyInAPI: [],
    onlyInCSV: [],
    matches: [],
    mismatches: []
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        // Load API breeds
        const apiResponse = await fetch('/api/debug-breeds');
        const apiData = await apiResponse.json();
        const apiBreedNames = apiData.breeds.map(b => b.breed);
        setApiBreeds(apiBreedNames);

        // Load CSV breeds
        const csvResponse = await fetch('/breed-image-attributions.csv');
        const csvText = await csvResponse.text();
        const csvLines = csvText.split('\n').filter(line => line.trim());
        const csvBreedNames = csvLines.slice(1).map(line => {
          const values = line.split(',');
          return values[0] ? values[0].trim() : '';
        }).filter(name => name);
        setCsvBreeds(csvBreedNames);

        // Compare breeds
        const onlyInAPI = apiBreedNames.filter(name => !csvBreedNames.includes(name));
        const onlyInCSV = csvBreedNames.filter(name => !apiBreedNames.includes(name));
        const matches = apiBreedNames.filter(name => csvBreedNames.includes(name));
        const mismatches = [];

        setComparison({
          onlyInAPI,
          onlyInCSV,
          matches,
          mismatches
        });

      } catch (error) {
        console.error('Error loading data:', error);
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, []);

  if (loading) {
    return <div>Loading breed comparison...</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Breed Name Comparison</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* API Breeds */}
        <div className="bg-blue-100 p-4 rounded">
          <h2 className="text-lg font-semibold mb-2">API Breeds ({apiBreeds.length})</h2>
          <div className="bg-white p-2 rounded max-h-64 overflow-y-auto text-sm">
            {apiBreeds.slice(0, 50).map((breed, index) => (
              <div key={index} className="border-b py-1">
                {breed}
              </div>
            ))}
            {apiBreeds.length > 50 && (
              <div className="text-gray-500">... and {apiBreeds.length - 50} more</div>
            )}
          </div>
        </div>

        {/* CSV Breeds */}
        <div className="bg-green-100 p-4 rounded">
          <h2 className="text-lg font-semibold mb-2">CSV Breeds ({csvBreeds.length})</h2>
          <div className="bg-white p-2 rounded max-h-64 overflow-y-auto text-sm">
            {csvBreeds.slice(0, 50).map((breed, index) => (
              <div key={index} className="border-b py-1">
                {breed}
              </div>
            ))}
            {csvBreeds.length > 50 && (
              <div className="text-gray-500">... and {csvBreeds.length - 50} more</div>
            )}
          </div>
        </div>
      </div>

      {/* Comparison Results */}
      <div className="mt-6 space-y-4">
        {/* Matches */}
        <div className="bg-green-100 p-4 rounded">
          <h2 className="text-lg font-semibold mb-2">Matches ({comparison.matches.length})</h2>
          <div className="bg-white p-2 rounded max-h-32 overflow-y-auto text-sm">
            {comparison.matches.slice(0, 20).map((breed, index) => (
              <div key={index} className="border-b py-1">
                {breed}
              </div>
            ))}
            {comparison.matches.length > 20 && (
              <div className="text-gray-500">... and {comparison.matches.length - 20} more</div>
            )}
          </div>
        </div>

        {/* Only in API */}
        <div className="bg-yellow-100 p-4 rounded">
          <h2 className="text-lg font-semibold mb-2">Only in API ({comparison.onlyInAPI.length})</h2>
          <div className="bg-white p-2 rounded max-h-32 overflow-y-auto text-sm">
            {comparison.onlyInAPI.map((breed, index) => (
              <div key={index} className="border-b py-1">
                {breed}
              </div>
            ))}
          </div>
        </div>

        {/* Only in CSV */}
        <div className="bg-orange-100 p-4 rounded">
          <h2 className="text-lg font-semibold mb-2">Only in CSV ({comparison.onlyInCSV.length})</h2>
          <div className="bg-white p-2 rounded max-h-32 overflow-y-auto text-sm">
            {comparison.onlyInCSV.map((breed, index) => (
              <div key={index} className="border-b py-1">
                {breed}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
