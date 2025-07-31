'use client';
import { useState } from "react";
import Link from "next/link";
import DogCard from "@/app/components/DogCard";
import PropTypes from 'prop-types';

export default function BreedsList({ initialDogs }) {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredDogs = initialDogs.filter(dog =>
    dog.breed.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      {/* Search Section */}
      <div className="mb-8">
        <div className="relative max-w-xl mx-auto">
          <input
            type="text"
            placeholder="Search dog breeds..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <svg
            className="absolute right-3 top-3 h-6 w-6 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
      </div>

      {/* Breeds Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
        {filteredDogs.map((dog) => (
          <Link href={`/breeds/${dog.id}`} key={dog.id}>
            <DogCard dog={dog} />
          </Link>
        ))}
      </div>
    </>
  );
}

BreedsList.propTypes = {
  initialDogs: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      breed: PropTypes.string.isRequired,
      image: PropTypes.string.isRequired
    })
  ).isRequired
};