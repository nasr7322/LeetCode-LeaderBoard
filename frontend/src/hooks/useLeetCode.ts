import { useEffect, useState } from "react";
import { UserData } from "../types/leetcode";

const API_URL = import.meta.env.VITE_API_KEY || "http://localhost:3000";

export const useLeetCode = () => {
    const [userData, setUserData] = useState<UserData[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [serverChecked, setServerChecked] = useState(false);

    useEffect(() => {
        const checkServer = async () => {
            try {
                const response = await fetch(`${API_URL}/`);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                setServerChecked(true);
                return true;
            } catch (err) {
                setError(
                    "Failed to connect to the LeetCode Leaderboard server. Please try again later."
                );
                setLoading(false);
                return false;
            }
        };

        const fetchData = async () => {
            const serverRunning = await checkServer();
            if (!serverRunning) return;

            try {
                const response = await fetch(`${API_URL}/api/users`);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                console.log(data);
                setUserData(data.usersData as UserData[]);
                if (data.fetchedUsers === 0)
                    setError(
                        "Failed to fetch LeetCode data. Please check your internet connection and try again."
                    );
                else if (data.fetchedUsers < data.totalUsers)
                    setError(
                        `Successfully fetched data for ${data.fetchedUsers} out of ${data.totalUsers} users.`
                    );
                else setError(null);
                setLoading(false);
            } catch (err) {
                setError(
                    "An unexpected error occurred. Please try again later."
                );
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    return { userData, loading, error, serverChecked };
};
