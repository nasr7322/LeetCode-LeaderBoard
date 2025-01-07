# LeetCode-LeaderBoard 

![Static Badge](https://img.shields.io/badge/Hosted_on-Vercel-black%3Flogo%3Dvercel)

LeetCode Leaderboard is a React application that displays a leaderboard of users based on their LeetCode statistics. The application fetches user data from the LeetCode API and displays it in a sortable and paginated table.

<img src="./images/Project%20Ui.png" alt="LeetCode Leaderboard">

## Features

- Display LeetCode user statistics including total problems solved, global ranking, acceptance rate, current streak, and progress.
- Sort the leaderboard by different criteria such as total problems solved, global ranking, acceptance rate, and current streak.
- Paginate the leaderboard with options to select the number of items per page.
- Add new users to the leaderboard.
- Responsive design with Tailwind CSS.


## Installation

1. Clone the repository:
    ```sh
    gh repo clone nasr7322/LeetCode-LeaderBoard
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

1. The leaderboard will display the default users from the `users.json` file.
2. Use the dropdown menu to select the number of items per page.
3. Click on the column headers to sort the leaderboard by different criteria.
4. Use the pagination buttons to navigate through the pages.


## How It Works

The application uses the LeetCode API from the [leetcode-stats-api](https://github.com/JeremyTsaii/leetcode-stats-api) repository to fetch user data from `https://leetcode-stats-api.herokuapp.com/{username}`.
