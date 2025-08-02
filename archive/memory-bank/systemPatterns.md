# System Patterns: Dog Website

**Architecture:**

*   **Frontend:** Next.js (React) with the App Router for routing and component structure.
*   **Backend:** API routes within the `app/api/` directory for handling data fetching and interactions.
*   **Database:** Supabase for storing breed data, adoption listings, and potentially user data.
*   **Data Sources:**
    *   Supabase database for structured data.
    *   CSV file (`app/database/akc-data-latest.csv`) for initial breed information.
    *   Python scripts (`app/components/breeds/unsplash.py`, `app/news/ddgnews.py`) for fetching images and news.

**Key Technical Decisions:**

*   Using Next.js App Router for improved performance and SEO.
*   Employing Supabase for database management and authentication.
*   Integrating external APIs (Google Maps API) for location-based services.
*   Using Tailwind CSS for styling and responsive design.

**Design Patterns:**

*   Component-Based Architecture: The frontend is built using reusable React components.
*   API Route Pattern: Data fetching and interactions are handled through API routes.
*   Server-Side Rendering (SSR) and Static Site Generation (SSG): Next.js is used to optimize performance and SEO.

**Component Relationships:**

*   `app/layout.tsx`: Defines the root layout of the application.
*   `app/page.tsx`: The main landing page.
*   `app/breeds/page.tsx`: Displays the list of dog breeds.
*   `app/breeds/[slug]/page.tsx`: Displays detailed information for a specific breed.
*   `app/components/BreedCard.jsx`: A reusable component for displaying breed information.
*   `app/components/Nav.jsx`: The navigation bar.
*   `app/components/Footer.jsx`: The footer.

**Critical Implementation Paths:**

*   Fetching breed data from Supabase and displaying it in the breed list.
*   Fetching images using the `unsplash.py` script and displaying them on breed pages.
*   Integrating the Google Maps API for the dog cafe finder.
