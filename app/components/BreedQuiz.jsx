'use client';
import { useState } from 'react';

export default function BreedQuiz({ onResults }) {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({});

  const questions = [
    {
      id: 'living_space',
      question: 'What type of home do you live in?',
      options: [
        { value: 'apartment', label: 'Apartment' },
        { value: 'house_small', label: 'House with small yard' },
        { value: 'house_large', label: 'House with large yard' }
      ]
    },
    {
      id: 'activity',
      question: 'How active is your lifestyle?',
      options: [
        { value: 'sedentary', label: 'Mostly sedentary' },
        { value: 'moderate', label: 'Moderately active' },
        { value: 'very_active', label: 'Very active' }
      ]
    },
    {
      id: 'experience',
      question: 'What is your experience with dogs?',
      options: [
        { value: 'first_time', label: 'First-time owner' },
        { value: 'some', label: 'Some experience' },
        { value: 'experienced', label: 'Very experienced' }
      ]
    },
    {
      id: 'time',
      question: 'How much time can you dedicate to grooming?',
      options: [
        { value: 'minimal', label: 'Minimal (occasional bath/brush)' },
        { value: 'moderate', label: 'Moderate (weekly grooming)' },
        { value: 'lots', label: 'Lots (daily grooming)' }
      ]
    },
    {
      id: 'household',
      question: 'Who else lives in your household?',
      options: [
        { value: 'alone', label: 'Live alone' },
        { value: 'adults', label: 'Adults only' },
        { value: 'children', label: 'Family with children' },
        { value: 'pets', label: 'Other pets' }
      ]
    }
  ];

  const handleAnswer = (value) => {
    const currentQuestion = questions[step];
    const newAnswers = {
      ...answers,
      [currentQuestion.id]: value
    };
    setAnswers(newAnswers);

    if (step < questions.length - 1) {
      setStep(step + 1);
    } else {
      // Convert complete answers to breed filters
      const filters = {
        size: newAnswers.living_space === 'apartment' ? 'small' :
              newAnswers.living_space === 'house_small' ? 'medium' : 'large',
        energy: newAnswers.activity === 'sedentary' ? 'low' :
               newAnswers.activity === 'very_active' ? 'high' : 'medium',
        trainability: newAnswers.experience === 'first_time' ? 'high' :
                     newAnswers.experience === 'some' ? 'medium' : 'low',
        grooming: newAnswers.time === 'minimal' ? 'low' :
                 newAnswers.time === 'lots' ? 'high' : 'medium'
      };

      // Add delay to ensure state is updated
      setTimeout(() => {
        onResults(filters);
      }, 0);
    }
  };

  if (step >= questions.length) {
    return null;
  }

  const currentQuestion = questions[step];

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg mb-8">
      <h3 className="text-xl font-bold mb-4">
        Question {step + 1} of {questions.length}
      </h3>
      <p className="text-lg mb-6">{currentQuestion.question}</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {currentQuestion.options.map((option) => (
          <button
            key={option.value}
            onClick={() => handleAnswer(option.value)}
            className="px-6 py-3 bg-secondary/20 hover:bg-primary hover:text-white rounded-lg transition-colors text-left"
          >
            {option.label}
          </button>
        ))}
      </div>
    </div>
  );
}