export function getAllCourses() {
  return courses;
}

export function getCourseById(id) {
  return courses.find(course => course.id === id);
}

const courses = [
  { 
    id: 1, 
    title: 'Dog Behavior Courses', 
    description: 'Understand canine behavior and learn effective training techniques.',
    image: 'https://cdn01.alison-static.net/courses/4321/alison_courseware_intro_4321.jpg',
    price: 'Free',
    provider: 'Alison',
    link: 'https://alison.com/tag/dog-behavior?utm_source=alison_user&utm_medium=affiliates&utm_campaign=50431159'
  },
  { 
    id: 2, 
    title: 'Working with Dogs', 
    description: 'Explore career opportunities in the canine industry and develop professional skills.',
    image: 'https://cdn01.alison-static.net/courses/4482/alison_courseware_intro_4482.jpg',
    price: 'Free',
    provider: 'Alison',
    link: 'https://alison.com/course/working-with-dogs?utm_source=alison_user&utm_medium=affiliates&utm_campaign=50431159'
  },
  { 
    id: 3, 
    title: 'Dog Emotion and Cognition', 
    description: 'Learn about dog psychology and how dogs think and feel.',
    image: 'https://d3njjcbhbojbot.cloudfront.net/api/utilities/v1/imageproxy/https://coursera-course-photos.s3.amazonaws.com/6a/512570cd7811e49b4cb76fa1d10fb6/French-Bulldog.jpg?auto=format%2Ccompress&dpr=2&w=150&h=150&fit=crop',
    price: 'Free',
    provider: 'Coursera',
    link: 'https://www.coursera.org/collections/popular-free-canine-courses'
  },
  { 
    id: 4, 
    title: 'Natural Remedies for Dog Illnesses and Dog Training', 
    description: 'Learn natural approaches to treating common dog health issues and effective training methods.',
    image: 'https://cdn01.alison-static.net/courses/4361/alison_courseware_intro_4361.jpg',
    price: 'Free',
    provider: 'Alison',
    link: 'https://alison.com/course/natural-remedies-for-dog-illnesses-and-dog-training?utm_source=alison_user&utm_medium=affiliates&utm_campaign=50431159'
  },
  { 
    id: 5, 
    title: 'Dog Health, Dog Breeds and Basic Anatomy', 
    description: 'Learn about different dog breeds, their health needs, and basic canine anatomy.',
    image: 'https://cdn01.alison-static.net/courses/4779/alison_courseware_intro_4779.jpg',
    price: 'Free',
    provider: 'Alison',
    link: 'https://alison.com/course/dog-health-dog-breeds-and-basic-anatomy?utm_source=alison_user&utm_medium=affiliates&utm_campaign=50431159'
  },
  { 
    id: 6, 
    title: 'Dog Training: The Ultimate Guide to Puppy Training', 
    description: 'Comprehensive guide to training puppies with effective and humane methods.',
    image: 'https://cdn01.alison-static.net/courses/4220/alison_courseware_intro_4220.jpg',
    price: 'Free',
    provider: 'Alison',
    link: 'https://alison.com/course/dog-training-the-ultimate-guide-to-puppy-training?utm_source=alison_user&utm_medium=affiliates&utm_campaign=50431159'
  }
];