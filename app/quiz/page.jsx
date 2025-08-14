'use client';
import { useState, useEffect } from 'react';
import ShareButtons from '@/app/components/ShareButtons';

export default function QuizPage() {
  const [dogImage, setDogImage] = useState('');
  const [breeds, setBreeds] = useState([]);
  const [correctBreed, setCorrectBreed] = useState('');
  const [streak, setStreak] = useState(0);
  const [bestStreak, setBestStreak] = useState(0);
  const [revealedAnswer, setRevealedAnswer] = useState(null);
  const [userAnswer, setUserAnswer] = useState(null);

  useEffect(() => {
    fetchDogImageAndBreeds();
  }, []);

  const fetchDogImageAndBreeds = async () => {
    try {
      const breedsResponse = await fetch('https://dog.ceo/api/breeds/list/all');
      const breedsData = await breedsResponse.json();
      const breedsList = Object.keys(breedsData.message);
      
      // Get 4 random breeds
      const randomBreeds = getRandomBreeds(breedsList, 4);
      setBreeds(randomBreeds);
      
      // Select the first breed from our random options as the correct answer
      const correctBreedForImage = randomBreeds[0];
      setCorrectBreed(correctBreedForImage);
      
      // Fetch an image for the correct breed
      // Try to get a more complete view of the dog
      const breedImageResponse = await fetch(`https://dog.ceo/api/breed/${correctBreedForImage}/images/random`);
      const breedImageData = await breedImageResponse.json();
      setDogImage(breedImageData.message);
      
      // Also fetch a few more images for this breed as backup
      // and pick the one that looks most complete (this is a simple approach)
      // In a real app, you might want to implement more sophisticated image selection
      const backupImagesResponse = await fetch(`https://dog.ceo/api/breed/${correctBreedForImage}/images/random/3`);
      const backupImagesData = await backupImagesResponse.json();
      
      // For now, we'll stick with the first image, but this gives us options
      // to implement better image selection logic if needed
      // setDogImage(backupImagesData.message[0]); // Uncomment to use first backup image
      
    } catch (error) {
      console.error('Failed to fetch quiz data:', error);
    }
    // Reset revealed answer and user answer for the new question
    setRevealedAnswer(null);
    setUserAnswer(null);
  };

  const getRandomBreeds = (breedsList, count) => {
    const shuffled = [...breedsList].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  };

  const handleAnswer = (breed) => {
    setUserAnswer(breed);
    if (breed === correctBreed) {
      const newStreak = streak + 1;
      setStreak(newStreak);
      if (newStreak > bestStreak) {
        setBestStreak(newStreak);
      }
      setRevealedAnswer(null);
    } else {
      setStreak(0);
      setRevealedAnswer(correctBreed);
    }
    // Delay fetching next question to let user see feedback
    setTimeout(() => {
      fetchDogImageAndBreeds();
    }, 1500);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-primary to-accent py-16 px-8 rounded-xl mb-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-text">
          Dog Breed Quiz
        </h1>
        <p className="text-lg md:text-xl max-w-2xl text-text">
          Test your knowledge of dog breeds and see how many you can identify correctly!
        </p>
      </div>

      {/* Quiz Section */}
      <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-lg p-8 mb-12">
        {dogImage ? (
          <div className="relative w-full h-64 md:h-96 mb-8 rounded-lg overflow-hidden">
            <img
              src={dogImage}
              alt="Mystery dog"
              className="w-full h-full object-contain"
            />
          </div>
        ) : (
          <div className="w-full h-64 md:h-96 bg-gray-200 rounded-lg mb-8 animate-pulse" />
        )}
        
        <div className="grid grid-cols-2 gap-4">
          {breeds.map((breed, index) => (
            <button
              key={index}
              onClick={() => handleAnswer(breed)}
              disabled={revealedAnswer !== null}
              className={`bg-white border-2 font-semibold py-3 px-6 rounded-lg transition-colors duration-200 ${
                revealedAnswer !== null
                  ? breed === correctBreed
                    ? 'ring-2 ring-green-400 border-green-300 bg-green-50 text-green-700'
                    : breed === userAnswer
                    ? 'border-red-200 bg-red-50 text-red-700 opacity-60'
                    : 'border-gray-200 text-gray-500'
                  : 'border-primary hover:bg-primary hover:text-white text-primary'
              }`}
            >
              {breed.replace('-', ' ').split(' ').map(word => 
                word.charAt(0).toUpperCase() + word.slice(1)
              ).join(' ')}
            </button>
          ))}
        </div>

        {revealedAnswer && (
          <div
            className="mt-6 rounded-lg border border-green-200 bg-green-50 p-4 text-center text-green-700"
            aria-live="polite"
          >
            <p className="font-medium">
              Correct answer: <span className="font-bold">{revealedAnswer.replace('-', ' ').split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}</span>
            </p>
          </div>
        )}

        <div className="mt-8 text-center space-y-2">
          <p className="text-lg">
            Current Streak: <span className="font-bold text-primary">{streak}</span>
          </p>
          <p className="text-lg">
            Best Streak: <span className="font-bold text-accent">{bestStreak}</span>
          </p>
        </div>
      </div>

      {/* Share Section */}
      <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-lg p-8 mb-12">
        <div className="text-center">
          <h3 className="text-xl font-semibold mb-4">Share the Quiz</h3>
          <p className="text-gray-600 mb-6">
            Challenge your friends! Current streak: <span className="font-bold text-primary">{streak}</span>
            {bestStreak > 0 && (
              <span>, Best streak: <span className="font-bold text-accent">{bestStreak}</span></span>
            )}
          </p>
          <ShareButtons 
            path="/quiz"
            title="Dog Breed Quiz Challenge"
            text={`I'm testing my dog breed knowledge! ${bestStreak > 0 ? `My best streak is ${bestStreak}!` : 'Can you beat my score?'} Try the quiz:`}
            className="justify-center"
          />
        </div>
      </div>
    </div>
  );
}
