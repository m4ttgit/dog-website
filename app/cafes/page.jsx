'use client';

import { useState, useEffect } from 'react';
import Papa from 'papaparse';
import CafeList from './CafeList';

export default function CafesPage() {
  const [cafes, setCafes] = useState([]);

  useEffect(() => {
    const fetchCafes = async () => {
      const response = await fetch('/database/dog_cafe_sg1.csv');
      const csvText = await response.text();
      const result = Papa.parse(csvText, { header: true });
      
      const transformedCafes = result.data.map(cafe => ({
        name: cafe.business_name,
        address: cafe.address,
        rating: cafe.rating,
        likes: cafe.reviews,
        type: 'Dog-Friendly Cafe',
        mapsUrl: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
          `${cafe.business_name} ${cafe.address}`
        )}`,
        website: cafe.website,
        phone: cafe.phone,
        price: cafe.price,
        user_review: cafe.user_review
      }));

      setCafes(transformedCafes);
    };

    fetchCafes();
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center mb-8">Dog-Friendly Cafes in Singapore</h1>
      <CafeList cafes={cafes} />
    </div>
  );
}