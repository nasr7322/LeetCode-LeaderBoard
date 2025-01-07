import { ErrorMessage } from './components/ErrorMessage';
import { Header } from './components/Header';
import { LeaderboardTable } from './components/LeaderboardTable';
import { LoadingSpinner } from './components/LoadingSpinner';
import usersData from './data/users.json';
import { useLeetCode } from './hooks/useLeetCode';
import { useEffect, useState } from 'react';
import { UserData } from './types/leetcode';

export function App() {
  const [userData, setUserData] = useState<UserData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const {
    userData: fetchedData,
    loading: dataLoading,
    error: fetchError,
  } = useLeetCode(usersData.users);

  useEffect(() => {
    if (!dataLoading && fetchedData) {
      // setUserData(fetchedData);
      let newData = [...userData];
      fetchedData.forEach((user) => {
        const index = newData.findIndex((u) => u.username === user.username);
        if (index !== -1) newData[index] = user;
        else newData.push(user);
      });
      setUserData(newData);
      setLoading(dataLoading);
      if (fetchedData.length === 0) setError('Failed to fetch LeetCode data');
      else if (fetchedData.length < usersData.users.length)
        setError('Failed to fetch data for some users');
      else setError(null);
    } else if (fetchError) {
      setError(fetchError);
      setLoading(false);
    }
  }, [dataLoading, fetchedData, fetchError]);

  return (
    <div className="min-h-screen bg-leetcode-dark">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <Header />
        {loading && <LoadingSpinner />}
        {!loading && userData.length > 0 && (
          <LeaderboardTable data={userData} />
        )}
        {error && <ErrorMessage message={error} />}
      </div>
    </div>
  );
}

export default App;
