import { useEffect, useState } from "react";
import { LeetCodeStats, UserData } from "../types/leetcode";
import { UserProfile } from "../types/user";

// Update the API URL to use an environment variable
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

// ... rest of the file stays the same ..
                // ... rest of the code stays the same ...


const getCurrentStreak = (
    calendar: Record<string, number>
): { solvedToday: boolean; currentStreak: number } => {
    const timestamps = Object.keys(calendar)
        .map(Number)
        .sort((a, b) => b - a);

    let currentStreak = 0;
    let solvedToday = true;
    let previousDate = new Date(timestamps[0] * 1000);
    if (previousDate.getDate() !== new Date().getDate()) {
        solvedToday = false;
        if (previousDate.getDate() !== new Date().getDate() - 1) {
            return { solvedToday, currentStreak };
        }
    }
    currentStreak = 1;
    for (let i = 0; i < timestamps.length; i++) {
        const currentDate = new Date(timestamps[i] * 1000);
        if (previousDate.getDate() === currentDate.getDate() + 1) {
            currentStreak += 1;
        } else if (previousDate.getDate() !== currentDate.getDate()) {
            break;
        }

        previousDate = currentDate;
    }
    return { solvedToday, currentStreak };
};

export const useLeetCode = (users: UserProfile[]) => {
    const [userData, setUserData] = useState<UserData[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
      const fetchData = async () => {
    try {
        const promises = users.map(async (user) => {
            try {
                const response = await fetch(
                    `${API_URL}/${user.username}`
                );
                        if (!response.ok) {
                            throw new Error("Failed to fetch user data");
                        }
                        const data: LeetCodeStats = await response.json();
                        const { solvedToday, currentStreak } = getCurrentStreak(
                            data.submissionCalendar
                        );
                        console.log(user.username, currentStreak, solvedToday);
                        return {
                            ...data,
                            username: user.username,
                            displayName: user.displayName,
                            currentStreak,
                            solvedToday,
                        };
                    } catch (err) {
                        console.error(
                            `Error fetching data for user ${user.username}:`
                        );
                        return null;
                    }
                });
                const results = (await Promise.all(promises)).filter(
                    (result) => result !== null
                );
                let mergedData = [...userData];
                results.forEach((result) => {
                    const index = mergedData.findIndex(
                        (user) => user.username === result.username
                    );
                    if (index === -1) {
                        mergedData.push(result as UserData);
                    } else {
                        mergedData[index] = result as UserData;
                    }
                });
                setUserData(mergedData);
                if (userData.length === 0)
                    setError("Failed to fetch LeetCode data");
                else if (userData.length < users.length)
                    setError("Failed to fetch data for some users");
                else setError(null);
                setLoading(false);
            } catch (err) {
                setError("Failed to fetch LeetCode data");
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    return { userData, loading, error };
};