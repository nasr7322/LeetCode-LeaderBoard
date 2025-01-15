# LeetCode-LeaderBoard 🚀

LeetCode-LeaderBoard is a web application designed to help you and your friends stay motivated while solving LeetCode problems. By showcasing users' LeetCode statistics in a sortable, interactive leaderboard, it makes tracking progress competitive and fun.

The app fetches real-time data from the LeetCode API and presents it in an intuitive, user-friendly interface, complete with animations and responsive design. 🌟

![LeetCode Leaderboard UI](./images/Ui.png)

## Features

- Displays LeetCode user statistics, including:
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

2. Update the usernames you want to track in the [users.js](backend/data/users.js) file:

3. Navigate to the backend folder, install dependencies and run the server:
    ```sh
    cd backend
    npm install
    npm start
    ```

4. Navigate to the frontend folder, install dependencies and run the app:
    ```sh
    cd ../frontend
    npm install
    npm start
    ```

5. Open your browser and navigate to `http://localhost:5173`.

## How It Works

Our project utilizes Vite React for the frontend and Express for the backend server, both hosted on Vercel. The application fetches real-time user statistics from the LeetCode GraphQL API `https://leetcode.com/graphql/` to ensure up-to-date leaderboard rankings.

## Hosting

[![Static Badge](https://img.shields.io/badge/Hosted_on-Vercel-black%3Flogo%3Dvercel)](https://leet-code-leader-board.vercel.app/)

## Contributing
Contributions are welcome! If you’d like to contribute, please fork the repository, create a new branch for your changes, and submit a pull request. For major changes, please open an issue first to discuss what you’d like to change.

## License

This project is licensed under the [MIT License](./LICENSE).