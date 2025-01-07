import { useState, useEffect } from "react";
import { LeetCodeStats, UserData } from "../types/leetcode";
import { UserProfile } from "../types/user";

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
        currentStreak = 1;
    }
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
                    const response = await fetch(
                        `https://leetcode-stats-api.herokuapp.com/${user.username}`
                    );
                    const data: LeetCodeStats = await response.json();
                    const { solvedToday, currentStreak } = getCurrentStreak(
                        data.submissionCalendar
                    );
                    // console.log(user.username, currentStreak, solvedToday);
                    return {
                        ...data,
                        username: user.username,
                        displayName: user.displayName,
                        currentStreak,
                        solvedToday,
                    };
                });

                const results = await Promise.all(promises);
                setUserData(results);
                setLoading(false);
                // console.log(results);
            } catch (err) {
                setError("Failed to fetch LeetCode data");
                setLoading(false);
            }
        };

        fetchData();
    }, [users]);

    return { userData, loading, error };
};
