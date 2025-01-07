# LeetCode-LeaderBoard

LeetCode Leaderboard is a React application that displays a leaderboard of users based on their LeetCode statistics. The application fetches user data from the LeetCode API and displays it in a sortable and paginated table.

## Features

- Display LeetCode user statistics including total problems solved, global ranking, acceptance rate, current streak, and progress.
- Sort the leaderboard by different criteria such as total problems solved, global ranking, acceptance rate, and current streak.
- Paginate the leaderboard with options to select the number of items per page.
- Add new users to the leaderboard.
- Responsive design with Tailwind CSS.

## Demo

![Static Badge](https://img.shields.io/badge/Hosted_on-Vercel-black%3Flogo%3Dvercel)

## Installation

1. Clone the repository:
    ```sh
    git clone https://github.com/nasr7322/LeetCode-LeaderBoard.git
    cd LeetCode-LeaderBoard
    ```

2. Install dependencies:
    ```sh
    npm install
    ```

3. Update users in the JSON file:
    ```sh
    src/data/users.json
    ```

4. Start the development server:
    ```sh
    npm run dev
    ```

4. Open your browser and navigate to `http://localhost:5173`.

## Usage

1. The leaderboard will display the default users from the [src/data/users.json](src/data/users.json) file.
2. Use the dropdown menu to select the number of items per page.
3. Click on the column headers to sort the leaderboard by different criteria.
4. Use the pagination buttons to navigate through the pages.

## Project Structure
