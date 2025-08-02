# Technical Context: Dog Website

**Technologies Used:**

*   Next.js: A React framework for building performant web applications.
*   React: A JavaScript library for building user interfaces.
*   TypeScript: A superset of JavaScript that adds static typing.
*   Tailwind CSS: A utility-first CSS framework for styling.
*   Supabase: A cloud-based database and authentication platform.
*   Google Maps API: For integrating maps and location-based services.
*   Python: Used for scripts to fetch data (images, news).
*   ESLint: A JavaScript linter for code quality.

**Development Setup:**

1.  Install Node.js and npm.
2.  Clone the repository.
3.  Run `npm install` to install dependencies.
4.  Create a `.env.local` file and add the required environment variables (e.g., Google Maps API key, Supabase credentials).

**Technical Constraints:**

*   API rate limits for external services (Google Maps API, Unsplash API, news APIs).
*   Data storage limitations in Supabase (depending on the pricing plan).
*   Performance considerations for large datasets (e.g., breed information, adoption listings).

**Dependencies:**

*   `@react-google-maps/api`: For integrating Google Maps.
*   `@supabase/supabase-js`: For interacting with the Supabase database.
*   `axios`: For making HTTP requests.
*   `csv-parse`: For parsing CSV data.
*   `next`: The Next.js framework.
*   `react`: The React library.
*   `react-dom`: For rendering React components in the browser.
*   `rss-parser`: For parsing RSS feeds.

**Tool Usage Patterns:**

*   `npm run dev`: Starts the Next.js development server.
*   `npm run build`: Builds the Next.js application for production.
*   `npm run lint`: Runs ESLint to check for code quality issues.
*   `npm run import-breeds`: Imports breed data from the CSV file into the Supabase database.
