import { ErrorMessage } from "./components/ErrorMessage";
import { Header } from "./components/Header";
import { LeaderboardTable } from "./components/LeaderboardTable";
import { LoadingSpinner } from "./components/LoadingSpinner";
import usersData from "./data/users.json";
import { useLeetCode } from "./hooks/useLeetCode";
import { useEffect, useState } from "react";
import { UserData } from "./types/leetcode";

export function App() {
    const [userData, setUserData] = useState<UserData[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const {
        userData: fetchedData,
        loading: dataLoading,
        error: fetchError,
        serverChecked
    } = useLeetCode(usersData.users);

    useEffect(() => {
        if (!dataLoading && fetchedData) {
            let newData = [...userData];
            fetchedData.forEach((user) => {
                const index = newData.findIndex(
                    (u) => u.username === user.username
                );
                if (index !== -1) newData[index] = user;
                else newData.push(user);
            });
            setUserData(newData);
            setLoading(dataLoading);
            setError(fetchError);
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
                {error && (
                    <div className="mt-8">
                        <ErrorMessage message={error} />
                        {!serverChecked && (
                            <div className="mt-4 bg-gray-800 p-4 rounded-lg text-leetcode-text">
                                <h3 className="text-lg font-semibold mb-2">To start the server:</h3>
                                <ol className="list-decimal list-inside space-y-2">
                                    <li>Open a new terminal</li>
                                    <li>Run: <code className="bg-gray-700 px-2 py-1 rounded">node server.js</code></li>
                                    <li>Wait for the server to start</li>
                                    <li>Refresh this page</li>
                                </ol>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}

export default App;