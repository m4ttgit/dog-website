'use client';

import { useEffect, useState } from 'react';
import { getCourseById } from "@/app/api/courses";
import Link from 'next/link';

export default function CourseDetailPage({ params }) {
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setCourse(getCourseById(parseInt(params.id)));
    setLoading(false);
  }, [params.id]);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8 flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h1 className="text-2xl font-bold mb-4">Course Not Found</h1>
        <p className="mb-4">The course you're looking for doesn't exist or has been removed.</p>
        <Link href="/courses" className="text-primary hover:underline">
          Return to Courses
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <Link href="/courses" className="text-primary hover:underline flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z" clipRule="evenodd" />
          </svg>
          Back to Courses
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="md:flex">
          <div className="md:w-1/3 h-64 md:h-auto relative">
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
          <div className="p-8 md:w-2/3">
            <div className="uppercase tracking-wide text-sm text-primary font-semibold">
              {course.provider}
            </div>
            <h1 className="text-3xl font-bold mt-2 mb-4">{course.title}</h1>
            <p className="text-gray-600 mb-8">{course.description}</p>
            
            <div className="mb-8">
              <h2 className="text-xl font-semibold mb-4">What You'll Learn</h2>
              <ul className="list-disc pl-5 space-y-2">
                <li>Comprehensive understanding of dog behavior and psychology</li>
                <li>Effective training techniques for various situations</li>
                <li>How to address common behavioral issues</li>
                <li>Best practices for dog care and welfare</li>
              </ul>
            </div>
            
            <a 
              href={course.link} 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-block bg-primary text-white font-bold px-6 py-3 rounded-lg hover:bg-primary-dark transition-colors"
            >
              Enroll Now
            </a>
            
            <p className="text-sm text-gray-500 mt-4">
              *This is an affiliate link. We may earn a commission if you enroll in this course.
            </p>
          </div>
        </div>
      </div>
      
      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-6">Why Take This Course?</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="text-primary text-4xl mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">Expert Instructors</h3>
            <p className="text-gray-600">Learn from industry professionals with years of experience in dog training and behavior.</p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="text-primary text-4xl mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">Learn at Your Own Pace</h3>
            <p className="text-gray-600">Access course materials anytime, anywhere, and progress through the content at your convenience.</p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="text-primary text-4xl mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">Practical Skills</h3>
            <p className="text-gray-600">Gain hands-on knowledge that you can immediately apply to improve your relationship with your dog.</p>
          </div>
        </div>
      </div>
    </div>
  );
}