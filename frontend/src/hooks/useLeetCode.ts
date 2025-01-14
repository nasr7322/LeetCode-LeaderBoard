import { useEffect, useState } from "react";
import { UserData } from "../types/leetcode";
import { UserProfile } from "../types/user";

const API_URL = "https://leet-code-leader-board-backend.vercel.app";
// const API_URL = "http://localhost:3000";

export const useLeetCode = (users: UserProfile[]) => {
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
                const promises = users.map(async (user) => {
                    try {
                        const response = await fetch(`${API_URL}/api/user`, {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json",
                            },
                            body: JSON.stringify({
                                username: user.username,
                            }),
                        });

                        if (!response.ok) {
                            throw new Error(
                                `HTTP error! status: ${response.status}`
                            );
                        }
                        const data = (await response.json()) as UserData;
                        data.displayName = user.displayName;
                        console.log(data);
                        return data;
                    } catch (err) {
                        console.error(
                            `Error fetching data for user ${user.username}:`,
                            err
                        );
                        return null;
                    }
                });

                const results = (await Promise.all(promises)).filter(
                    (result) => result !== null
                );

                if (results.length === 0) {
                    setError(
                        "Failed to fetch LeetCode data. Please check your internet connection and try again."
                    );
                } else if (results.length < users.length) {
                    setError(
                        `Successfully fetched data for ${results.length} out of ${users.length} users.`
                    );
                } else {
                    setError(null);
                }

                setUserData(results as UserData[]);
                setLoading(false);
            } catch (err) {
                setError(
                    "An unexpected error occurred. Please try again later."
                );
                setLoading(false);
            }
        };

        fetchData();
    }, [users]);

    return { userData, loading, error, serverChecked };
};
