'use client';
import { useState, useEffect } from 'react';
import BreedQuiz from '@/app/components/BreedQuiz';
import HeroSection from '@/app/components/breeds/HeroSection';
import WhatIsDogBreed from '@/app/components/breeds/WhatIsDogBreed';
import FilterPanel from '@/app/components/breeds/FilterPanel';
import BreedsResultsPanel from '@/app/components/breeds/BreedsResultsPanel';
import TopBreedsSection from '@/app/components/breeds/TopBreedsSection';

// Helper function to check trait levels
const checkTraitLevel = (value, filterType) => {
  const numValue = parseFloat(value) || 0;
  if (filterType === 'high') return numValue >= 0.7;
  if (filterType === 'medium') return numValue >= 0.4 && numValue < 0.7;
  if (filterType === 'low') return numValue < 0.4;
  return true; // 'all' case
};

function filterBreeds(breeds, filters) {
  const filtered = breeds.filter(breed => {
    if (!breed) return false;

    // Search by breed name
    if (filters.search && breed.breed.toLowerCase() !== filters.search.toLowerCase()) {
      return false;
    }
    
    // Filter by group
    if (filters.group !== 'all' && breed.group !== filters.group) {
      return false;
    }
    
    // Filter by size based on average height
    if (filters.size !== 'all') {
      const avgHeight = (breed.min_height + breed.max_height) / 2;
      if (filters.size === 'small' && avgHeight > 35) return false;
      if (filters.size === 'medium' && (avgHeight <= 35 || avgHeight > 55)) return false;
      if (filters.size === 'large' && avgHeight <= 55) return false;
    }

    // Filter by characteristics
    if (filters.energy !== 'all' && !checkTraitLevel(breed.energy_level_value, filters.energy)) {
      return false;
    }
    if (filters.trainability !== 'all' && !checkTraitLevel(breed.trainability_value, filters.trainability)) {
      return false;
    }
    if (filters.grooming !== 'all' && !checkTraitLevel(breed.grooming_frequency_value, filters.grooming)) {
      return false;
    }

    return true;
  });

  return filtered;
}

export default function BreedsPageClient({ initialBreeds }) {
  const [breeds] = useState(initialBreeds);
  const [showQuiz, setShowQuiz] = useState(false);
  const [groups] = useState([...new Set(initialBreeds.map(breed => breed.group))].filter(Boolean).sort());
  const [isClient, setIsClient] = useState(false);
  const [filters, setFilters] = useState({
    search: '',
    group: 'all',
    size: 'all',
    energy: 'all',
    trainability: 'all',
    grooming: 'all'
  });

  // Set isClient on mount
  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleQuizResults = (quizFilters) => {
    setFilters({
      search: '',
      group: 'all',
      size: quizFilters.size,
      energy: quizFilters.energy,
      trainability: quizFilters.trainability,
      grooming: quizFilters.grooming
    });
    setShowQuiz(false);
    
    if (typeof window !== 'undefined') {
      setTimeout(() => {
        const resultsSection = document.getElementById('breed-results');
        if (resultsSection) {
          resultsSection.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    }
  };

  const filteredBreeds = filterBreeds(breeds, filters);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" suppressHydrationWarning>
      {/* What is Dog Breed section at the top */}
      <WhatIsDogBreed />

      {/* Top 10 Most Popular Breeds section */}
      <TopBreedsSection breeds={breeds} isClient={isClient} />

      {/* Find Your Perfect Dog Breed section */}
      <div className="mt-12">
        <HeroSection onStartQuiz={() => setShowQuiz(true)} />
        
        {/* Compare Breeds CTA */}
        <div className="text-center mb-8">
          <a 
            href="/breed-compare" 
            className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
          >
            Compare Breeds Side by Side
          </a>
        </div>
        
        {showQuiz && <BreedQuiz onResults={handleQuizResults} />}

        <div id="breed-results" className="grid grid-cols-1 lg:grid-cols-4 gap-8 mb-12">
          <div className="lg:col-span-1">
            <FilterPanel
              filters={filters}
              setFilters={setFilters}
              breeds={breeds}
              groups={groups}
            />
          </div>
          <BreedsResultsPanel filteredBreeds={filteredBreeds} />
        </div>
      </div>
    </div>
  );
}
