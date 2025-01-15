import { useEffect, useState } from "react";
import { ErrorMessage } from "./components/ErrorMessage";
import { Header } from "./components/Header";
import { LeaderboardTable } from "./components/LeaderboardTable";
import { LoadingSpinner } from "./components/LoadingSpinner";
import { useLeetCode } from "./hooks/useLeetCode";
import { UserData } from "./types/leetcode";

function App() {
    const [userData, setUserData] = useState<UserData[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const {
        userData: fetchedData,
        loading: dataLoading,
        error: fetchError,
        serverChecked,
    } = useLeetCode();

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
            <div className="max-w-7xl mx-auto px-4 py-12">
                <Header />
                {loading && <LoadingSpinner />}
                {!loading && userData.length > 0 && (
                    <LeaderboardTable data={userData} />
                )}
                {error && (
                    <div className="mt-8">
                        <ErrorMessage message={error} />
                        {!serverChecked && (
                            <div className="mt-4 bg-gray-800/50 p-6 rounded-xl border border-gray-700">
                                <h3 className="text-xl font-semibold mb-4 text-leetcode-text">
                                    To start the server:
                                </h3>
                                <ol className="list-decimal list-inside space-y-3 text-gray-300">
                                    <li className="pl-2">
                                        Open a new terminal
                                    </li>
                                    <li className="pl-2">
                                        Run:{" "}
                                        <code className="bg-black/30 px-3 py-1 rounded-md font-mono text-leetcode-button">
                                            node server.js
                                        </code>
                                    </li>
                                    <li className="pl-2">
                                        Wait for the server to start
                                    </li>
                                    <li className="pl-2">Refresh this page</li>
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
