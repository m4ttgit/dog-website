'use client';

import { useState, useEffect } from 'react';
import { getAllCourses } from '@/app/api/courses';
import Link from 'next/link';

export default function CoursesPage() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    setCourses(getAllCourses());
    setLoading(false);
  }, []);

  const filteredCourses = courses.filter(course => {
    if (filter === 'all') return true;
    if (filter === 'free') return course.price === 'Free';
    return true;
  });

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8 flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Dog Training Courses</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Enhance your knowledge and skills with our curated selection of dog training and behavior courses. 
          Learn from experts and improve your relationship with your furry friend.
        </p>
      </div>

      <div className="mb-8 flex flex-wrap justify-center gap-4">
        <button
          onClick={() => setFilter('all')}
          className={`px-6 py-2 rounded-full transition-colors ${
            filter === 'all' 
              ? 'bg-primary text-white' 
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          All Courses
        </button>
        <button
          onClick={() => setFilter('free')}
          className={`px-6 py-2 rounded-full transition-colors ${
            filter === 'free' 
              ? 'bg-primary text-white' 
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          Free Courses
        </button>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredCourses.map((course) => (
          <div key={course.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
            <div className="relative h-48">
              {course.image ? (
                <img 
                  src={course.image} 
                  alt={course.title} 
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "/images/placeholder.jpg";
                  }}
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gray-200">
                  <span className="text-gray-400">No image available</span>
                </div>
              )}
              <div className="absolute top-0 right-0 bg-primary text-white px-3 py-1 m-4 rounded-full">
                {course.price}
              </div>
            </div>
            <div className="p-6">
              <div className="text-sm text-primary font-semibold mb-2">
                {course.provider}
              </div>
              <h3 className="text-xl font-bold mb-3">{course.title}</h3>
              <p className="text-gray-600 mb-4 line-clamp-3">{course.description}</p>
              <div className="flex justify-between items-center">
                <Link 
                  href={`/courses/${course.id}`}
                  className="text-primary hover:underline font-medium"
                >
                  Learn More
                </Link>
                <a 
                  href={course.link} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="bg-primary text-white px-4 py-2 rounded hover:bg-primary-dark transition-colors"
                >
                  Enroll Now
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}