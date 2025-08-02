# Active Context: Dog Website

**Current Work Focus:**

Addressing identified issues after initial setup and review.

**Recent Changes:**

*   Created the `memory-bank/` directory.
*   Created the initial core Memory Bank files:
    *   `memory-bank/projectbrief.md`
    *   `memory-bank/productContext.md`
    *   `memory-bank/systemPatterns.md`
    *   `memory-bank/techContext.md`

**Next Steps:**

1.  **Address npm vulnerabilities:** Run `npm audit fix`.
2.  **Review Supabase Data Import:** Check `scripts/importBreeds.js` and Supabase table.
3.  **Review Python script integration:** Check `unsplash.py` and `ddgnews.py` usage, dependencies, and API keys.
4.  **Review Google Maps API Key:** Check usage in `/cafes`.
5.  **Clean up debug logs:** Remove filtering logs from `BreedsPageClient.jsx`.

**Active Decisions and Considerations:**

*   Ensuring Python scripts are correctly integrated and have necessary dependencies/keys.
*   Verifying Supabase data integrity and import process, including confirming the `dogbreed` table existence through alternative methods since direct database access is restricted.
*   Addressing security vulnerabilities reported by npm audit.

**Important Patterns and Preferences:**

*   Using Markdown for documentation.
*   Following the Next.js App Router structure.
*   Using Tailwind CSS for styling.

**Learnings and Project Insights:**

*   The project uses a combination of Supabase, CSV data, and Python scripts for data sources.
*   The project relies on environment variables for API keys (Google Maps, Supabase, potentially Unsplash/News).
*   Build and lint commands pass after fixing initial ESLint and Supabase connection issues.
*   NPM audit reported 2 vulnerabilities (1 high, 1 critical).
*   The `scripts/importBreeds.js` script is designed to import CSV data into the Supabase `dogbreed` table.
