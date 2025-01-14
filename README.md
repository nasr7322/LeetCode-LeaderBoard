# LeetCode-LeaderBoard 

[![Static Badge](https://img.shields.io/badge/Hosted_on-Vercel-black%3Flogo%3Dvercel)](https://leet-code-leader-board.vercel.app/)

As a way to encourage me and my friends to solve more leetcode problems we decided to make a leaderboard website that displays and sorts users based on their LeetCode statistics.
The application fetches user data from the LeetCode API and displays it in a sortable user friendly table to help keep everyone motivated and having fun.

<img src="./images/Ui.png" alt="LeetCode Leaderboard"  style="width: 100%;">

## Features

- Display LeetCode user statistics including:
    - Active badge.
    - Total problems solved.
    - Global ranking.
    - Acceptance rate.
    - Current streak.
    - Progress per problem difficulty.
- Sort the leaderboard by different criteria.
- Responsive design and animations with Tailwind CSS.

## Installation

1. Clone the repository:
    ```sh
    gh repo clone nasr7322/LeetCode-LeaderBoard
    ```

2. Navigate to the backend folder and install dependencies:
    ```sh
    cd backend
    npm install
    ```

3. Start the backend server:
    ```sh
    npm start
    ```

4. Navigate to the frontend folder and install dependencies:
    ```sh
    cd ../frontend
    npm install
    ```

5. Update users in the JSON file:
    [frontend/src/data/users.json](frontend/src/data/users.json)

6. Start the development server:
    ```sh
    npm start
    ```

7. Open your browser and navigate to `http://localhost:5173`.

## How It Works

For the tech stack we used Vite React for our frontend and Express for the backend server, and hosted both on Vercel.
The application uses the LeetCode API to fetch user data by sending a GraphQl query to `https://leetcode.com/graphql/`.

## License

This project is licensed under the MIT License - see the LICENSE file for details.