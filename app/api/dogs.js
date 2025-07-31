
export function getAllDogs() {
  return dogs;
}

export function getDogById(id) {
  return dogs.find(dog => dog.id === id);
}

const news = [
  { id: 1, title: 'Dog Food Recall', description: 'A major dog food brand has issued a recall...' },
  { id: 2, title: 'New Dog Park Opens', description: 'A new dog park has opened in the city...' },
  { id: 3, title: 'Tips for Training Your Dog', description: 'Learn some helpful tips for training your dog...' },
];

export function getAllNews() {
  return news;
}

export function getNewsById(id) {
  return news.find(article => article.id === id);
}


export function getAllAdoptableDogs() {
  return adoptableDogs;
}

export function getAdoptableDogById(id) {
  return adoptableDogs.find(dog => dog.id === id);
}

async function fetchRandomDogImage() {
  try {
    const response = await fetch('https://dog.ceo/api/breeds/image/random');
    const data = await response.json();
    return data.message;
  } catch (error) {
    console.error('Error fetching random dog image:', error);
    return '/images/placeholder.jpg';
  }
}

const dogs = [
  { id: 1, breed: 'Golden Retriever', image: 'https://images.dog.ceo/breeds/retriever-golden/n02099601_1074.jpg' },
  { id: 2, breed: 'German Shepherd', image: 'https://images.dog.ceo/breeds/germanshepherd/n02106662_28905.jpg' },
  { id: 3, breed: 'Labrador Retriever', image: 'https://images.dog.ceo/breeds/retriever-labrador/n02099712_1059.jpg' },
  { id: 4, breed: 'French Bulldog', image: 'https://images.dog.ceo/breeds/bulldog-french/n02108915_4841.jpg' },
  { id: 5, breed: 'Poodle', image: 'https://images.dog.ceo/breeds/poodle-standard/n02113799_2293.jpg' },
  { id: 6, breed: 'Bulldog', image: 'https://images.dog.ceo/breeds/bulldog-english/jager-2.jpg' },
  { id: 7, breed: 'Rottweiler', image: 'https://images.dog.ceo/breeds/rottweiler/n02106550_13383.jpg' },
  { id: 8, breed: 'Yorkshire Terrier', image: 'https://images.dog.ceo/breeds/terrier-yorkshire/n02094433_7485.jpg' },
  { id: 9, breed: 'Beagle', image: 'https://images.dog.ceo/breeds/beagle/n02088364_13783.jpg' },
  { id: 10, breed: 'Dachshund', image: 'https://images.dog.ceo/breeds/dachshund/dachshund-1018409_640.jpg' },
  { id: 11, breed: 'Siberian Husky', image: 'https://images.dog.ceo/breeds/husky/n02110185_10047.jpg' },
  { id: 12, breed: 'Great Dane', image: 'https://images.dog.ceo/breeds/dane-great/n02109047_22498.jpg' }
];

const adoptableDogs = [
  { id: 1, name: 'Max', breed: 'German Shepherd', image: await fetchRandomDogImage() },
  { id: 2, name: 'Bella', breed: 'Beagle', image: await fetchRandomDogImage() },
  { id: 3, name: 'Rocky', breed: 'Boxer', image: await fetchRandomDogImage() },
];