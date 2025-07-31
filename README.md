# Dog Website

A comprehensive platform for dog lovers featuring breed information, adoption listings, news, quizzes, and a dog cafe finder.

## Features

- **Breed Directory**: Explore various dog breeds and their characteristics
- **Adoption Center**: Find dogs available for adoption
- **News Section**: Stay updated with the latest dog-related news
- **Interactive Quiz**: Test your knowledge about dog breeds
- **Dog Cafe Finder**: Locate dog-friendly cafes near you using Google Maps integration

## Getting Started

### Prerequisites

- Node.js 16.8 or later
- A Google Maps API key with Places API enabled

### Setup

1. Clone the repository
2. Install dependencies:

```bash
npm install
```

3. Create a `.env.local` file in the root directory and add your Google Maps API key:

```env
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_google_maps_api_key_here
```

4. Get a Google Maps API key:
   - Go to the [Google Cloud Console](https://console.cloud.google.com/)
   - Create a new project or select an existing one
   - Enable the Maps JavaScript API and Places API
   - Create credentials (API key)
   - Copy the API key to your `.env.local` file

5. Start the development server:

```bash
npm run dev
```

The application will be available at [http://localhost:3000](http://localhost:3000).

## Environment Setup

This project requires the following environment variables:

- `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY`: Your Google Maps API key for the cafe finder feature

Make sure these are properly set in your `.env.local` file before starting the application.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
