# DSJ04 React Podcast App: Search, Sort, Filter, and Pagination


# Project Overview

The DSJ04 React Podcast App is a dynamic web application that allows users to browse, search, sort, and filter podcasts fetched from an external API. Built with React and Vite, the app provides a responsive and intuitive interface for discovering podcasts by title, genre, and update date, with pagination for manageable browsing. The project demonstrates advanced state management, real-time updates, and modular code design.

# Key Features: 🗝🖤

Search: Find podcasts by typing keywords in the search bar (matches any part of the title).
Sort: Order podcasts by newest first, title A-Z, or title Z-A.
Filter: Select one or more genres to narrow down the podcast list.
Pagination: Browse podcasts in chunks of 10 per page with navigation controls.
Responsive Design: Adapts to mobile, tablet, and desktop screens.

# 🌸Setup Instructions

To set up and run the project locally, follow these steps:

1. Install Dependencies: Ensure Node.js is installed, then run:

npm install

2. Start the Development Server:

npm run dev

3. Open http://localhost:5173 in your browser to view the app.



# Project Structure:

index.html: Entry point for the app.

src/main.jsx: Renders the main App component.

src/App.jsx: Core logic for fetching data and handling search, sort, filter, and pagination.

src/App.css: Styles with responsive media queries.

src/data.js: Genre mapping data for filtering.

.gitignore: Excludes unnecessary files like node_modules and dist.

Usage Instructions

The app provides an interactive interface to explore podcasts using JavaScript-driven functionality. Below is how to interact with each feature:

🔎 Search:

Location: Top text input labeled “Search podcasts by title...”.

How to Use: Type a keyword (e.g., “History”) to filter podcasts whose titles contain the keyword (case-insensitive).
Behavior: Results update in real-time as you type, and pagination resets to page 1.

🧺 Sort

Location: Dropdown menu labeled “Sort by” with options: “Newest First,” “Title A-Z,” and “Title Z-A”.

How to Use: Select an option to reorder the podcast list.

Behavior: Sorting applies immediately, works with search and filter states, and resets pagination to page 1.

📍Filter by Genre

Location: Checkbox list under “Filter by Genre” (e.g., “Personal Growth,” “Comedy”).

How to Use: Check one or more genres to show only podcasts associated with those genres. Uncheck to remove filters.

Behavior: Filtering updates the podcast list instantly, preserves search and sort states, and resets pagination to page 1.

📄 Pagination

Location: Navigation buttons (“Previous,” page numbers, “Next”) below the podcast grid.

How to Use: Click page numbers to jump to a specific page or use “Previous”/“Next” to navigate.

Behavior: Displays 10 podcasts per page, maintains search, sort, and filter states, and scrolls to the top on page change.

🗒 Additional Notes

Loading State: A “Loading...” message appears while fetching data.

Error Handling: Displays an error message if the API fails.

No Results: Shows “No podcasts found” if no podcasts match the criteria.

Responsive Layout: The podcast grid adjusts to 1 column (mobile), 2 columns (tablet), or 3 columns (desktop).

🛠 Development Notes

API: Fetches podcast data from https://podcast-api.netlify.app.


Genre Data: Uses data.js for mapping genre IDs to titles.

Code Quality: Includes JSDoc comments, modular components (e.g., PodcastCard), and responsive CSS with media queries.

