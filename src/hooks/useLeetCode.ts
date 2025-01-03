import { useState, useEffect } from 'react';
import { LeetCodeStats, UserData } from '../types/leetcode';
import { UserProfile } from '../types/user';

export const useLeetCode = (users: UserProfile[]) => {
  const [userData, setUserData] = useState<UserData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const promises = users.map(async (user) => {
          const response = await fetch(`https://leetcode-stats-api.herokuapp.com/${user.username}`);
          const data: LeetCodeStats = await response.json();
          return { ...data, username: user.username, displayName: user.displayName };
        });

        const results = await Promise.all(promises);
        setUserData(results);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch LeetCode data');
        setLoading(false);
      }
    };

    fetchData();
  }, [users]);

  return { userData, loading, error };
};