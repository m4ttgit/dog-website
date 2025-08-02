'use client';

import { useState } from 'react';

import { FaStar, FaMapMarkerAlt, FaPaw, FaPhone, FaGlobe, FaDollarSign, FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const CafeList = ({ cafes }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const cafesPerPage = 9;

  const filteredCafes = Array.isArray(cafes) ? cafes.filter(cafe => {
    if (!cafe) return false; // Skip null or undefined cafe objects
    const safeSearchTerm = searchTerm?.toLowerCase() ?? '';
    return (
      (cafe.name?.toLowerCase() ?? '').includes(safeSearchTerm) ||
      (cafe.address?.toLowerCase() ?? '').includes(safeSearchTerm) ||
      (cafe.type?.toLowerCase() ?? '').includes(safeSearchTerm)
    );
  }) : [];

  const indexOfLastCafe = currentPage * cafesPerPage;
  const indexOfFirstCafe = indexOfLastCafe - cafesPerPage;
  const currentCafes = filteredCafes.slice(indexOfFirstCafe, indexOfLastCafe);
  const totalPages = Math.ceil(filteredCafes.length / cafesPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <input
          type="text"
          placeholder="Search cafes by name, location, or type..."
          className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {currentCafes.map((cafe, index) => {
          const colors = ['bg-blue-500', 'bg-green-500', 'bg-purple-500', 'bg-orange-500', 'bg-red-500'];
          const bgColor = colors[index % colors.length];
          
          return (
            <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
            <div className={`relative h-48 w-full ${bgColor} flex items-center justify-center`}>
              <div className="text-center text-white p-4">
                <div className="text-4xl mb-2">☕</div>
                <h3 className="text-lg font-bold">{cafe.name}</h3>
                <p className="text-sm opacity-90">Dog-Friendly Cafe</p>
              </div>
            </div>
            <div className="p-6">
              <div className="flex items-center gap-2 mb-2">
                <FaPaw className="text-blue-500" />
                <span className="text-sm text-gray-600">Featured Cafe</span>
              </div>
              
              <div className="flex items-center gap-2 mb-2">
                <div className="flex items-center">
                  <FaStar className="text-yellow-400" />
                  <span className="ml-1 text-gray-700">{cafe.rating}</span>
                </div>
                <span className="text-gray-500 text-sm">({cafe.likes} reviews)</span>
                {cafe.price && (
                  <span className="flex items-center gap-1 text-gray-600 ml-2">
                    <FaDollarSign />
                    <span>{cafe.price}</span>
                  </span>
                )}
              </div>

              <p className="text-gray-600 mb-2">{cafe.type}</p>
              <p className="text-gray-700 mb-2 flex items-start gap-2">
                <FaMapMarkerAlt className="mt-1 flex-shrink-0" />
                <span>{cafe.address}</span>
              </p>

              {cafe.phone && (
                <p className="text-gray-700 mb-2 flex items-center gap-2">
                  <FaPhone className="text-gray-600" />
                  <a href={`tel:${cafe.phone}`} className="hover:text-blue-500">{cafe.phone}</a>
                </p>
              )}

              {cafe.website && (
                <p className="text-gray-700 mb-2 flex items-center gap-2">
                  <FaGlobe className="text-gray-600" />
                  <a href={cafe.website} target="_blank" rel="noopener noreferrer" className="hover:text-blue-500 truncate">
                    {cafe.website.replace(/^https?:\/\//i, '')}
                  </a>
                </p>
              )}

              {cafe.user_review && (
                <div className="mt-3 mb-4 p-3 bg-gray-50 rounded-lg">
                  <p className="text-gray-600 text-sm italic">"{cafe.user_review}"</p>
                </div>
              )}

              <div className="flex gap-2">
                <a
                  href={cafe.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 inline-flex items-center justify-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors duration-300"
                >
                  <FaMapMarkerAlt />
                  View on Maps
                </a>
              </div>
            </div>
            </div>
          );
        })}
      </div>

      {filteredCafes.length === 0 && (
        <p className="text-center text-gray-500 mt-8">
          No cafes found matching your search.
        </p>
      )}

      {filteredCafes.length > 0 && (
        <div className="mt-8 flex justify-center items-center gap-4">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-4 py-2 rounded-lg bg-blue-500 text-white disabled:bg-gray-300 disabled:cursor-not-allowed hover:bg-blue-600 transition-colors duration-300 flex items-center gap-2"
          >
            <FaChevronLeft />
            Previous
          </button>
          <span className="text-gray-600">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-4 py-2 rounded-lg bg-blue-500 text-white disabled:bg-gray-300 disabled:cursor-not-allowed hover:bg-blue-600 transition-colors duration-300 flex items-center gap-2"
          >
            Next
            <FaChevronRight />
          </button>
        </div>
      )}
    </div>
  );
};

export default CafeList;
