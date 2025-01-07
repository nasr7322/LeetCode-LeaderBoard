import { ErrorMessage } from "./components/ErrorMessage";
import { Header } from "./components/Header";
import { LeaderboardTable } from "./components/LeaderboardTable";
import { LoadingSpinner } from "./components/LoadingSpinner";
import usersData from "./data/users.json";
import { useLeetCode } from "./hooks/useLeetCode";

export function App() {
    const { userData, loading, error } = useLeetCode(usersData.users);

    return (
        <div className="min-h-screen bg-leetcode-dark">
            <div className="max-w-7xl mx-auto px-4 py-8">
                <Header />
                {loading && <LoadingSpinner />}
                {!loading && error !== "Failed to fetch LeetCode data" && (
                    <LeaderboardTable data={userData} />
                )}
                {error && <ErrorMessage message={error} />}
            </div>
        </div>
    );
}

export default App;
