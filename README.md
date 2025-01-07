# LeetCode-LeaderBoard

LeetCode Leaderboard is a React application that displays a leaderboard of users based on their LeetCode statistics. The application fetches user data from the LeetCode API and displays it in a sortable and paginated table.

![LeetCode Leaderboard](./images/Project%20Ui.png)

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

1. The leaderboard will display the default users from the [users.json](http://_vscodecontentref_/1) file.
2. Use the dropdown menu to select the number of items per page.
3. Click on the column headers to sort the leaderboard by different criteria.
4. Use the pagination buttons to navigate through the pages.

## Project Structure

- [src](http://_vscodecontentref_/2): Contains the source code for the application.
  - `components/`: Contains React components used in the application.
    - [AddUserForm.tsx](http://_vscodecontentref_/3): Form to add new users to the leaderboard.
    - [ErrorMessage.tsx](http://_vscodecontentref_/4): Component to display error messages.
    - [Header.tsx](http://_vscodecontentref_/5): Header component for the application.
    - [LeaderboardTable.tsx](http://_vscodecontentref_/6): Table to display the leaderboard.
    - [LoadingSpinner.tsx](http://_vscodecontentref_/7): Loading spinner component.
  - [data/](http://_vscodecontentref_/8): Contains the user data in JSON format.
    - [users.json](http://_vscodecontentref_/9): Default users for the leaderboard.
  - `hooks/`: Contains custom React hooks.
    - [useLeetCode.ts](http://_vscodecontentref_/10): Custom hook to fetch LeetCode user data.
  - `types/`: Contains TypeScript type definitions.
    - [leetcode.ts](http://_vscodecontentref_/11): Type definitions for LeetCode user data.
    - [user.ts](http://_vscodecontentref_/12): Type definitions for user profiles.
  - `utils/`: Contains utility functions.
    - [storage.ts](http://_vscodecontentref_/13): Utility functions for local storage.
  - [App.tsx](http://_vscodecontentref_/14): Main application component.
  - [index.css](http://_vscodecontentref_/15): Global CSS file.
  - [main.tsx](http://_vscodecontentref_/16): Entry point for the React application.

## How It Works

The application uses the LeetCode API provided by the [leetcode-stats-api](https://github.com/JeremyTsaii/leetcode-stats-api) repository to fetch user data. The [useLeetCode](http://_vscodecontentref_/17) hook in [useLeetCode.ts](http://_vscodecontentref_/18) is responsible for fetching the data and managing the loading and error states. The fetched data is then displayed in the [LeaderboardTable](http://_vscodecontentref_/19) component in [LeaderboardTable.tsx](http://_vscodecontentref_/20).

The application also allows users to add new users to the leaderboard using the [AddUserForm](http://_vscodecontentref_/21) component in [AddUserForm.tsx](http://_vscodecontentref_/22). The user data is stored in the browser's local storage using utility functions from [storage.ts](http://_vscodecontentref_/23).

The application is styled using Tailwind CSS, with custom colors defined in the [tailwind.config.js](http://_vscodecontentref_/24) file.