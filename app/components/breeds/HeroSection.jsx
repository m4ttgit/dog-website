'use client';

export default function HeroSection({ onStartQuiz }) {
  return (
    <div className="bg-gradient-to-r from-primary to-accent text-white py-16 px-8 rounded-xl mb-12">
      <h1 className="text-4xl md:text-5xl font-bold mb-4">
        Find Your Perfect Dog Breed
      </h1>
      <div className="max-w-2xl">
        <p className="text-lg md:text-xl opacity-90 mb-8">
          Explore our comprehensive guide to find the ideal companion for your lifestyle.
        </p>
        <button
          onClick={onStartQuiz}
          className="bg-white text-primary hover:bg-secondary/20 px-6 py-3 rounded-lg font-semibold transition-colors"
        >
          Take Our Breed Match Quiz
        </button>
      </div>
    </div>
  );
}