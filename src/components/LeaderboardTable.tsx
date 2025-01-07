import {
    ArrowUpDown,
    ExternalLink,
    Flame,
    Target,
    Trophy,
    Zap,
} from "lucide-react";
import React, { useState } from "react";
import { UserData } from "../types/leetcode";

interface Props {
    data: UserData[];
}

type SortKey =
    | "totalSolved"
    | "ranking"
    | "acceptanceRate"
    | "contributionPoints"
    | "currentStreak";

export const LeaderboardTable: React.FC<Props> = ({ data }) => {
    const [sortKey, setSortKey] = useState<SortKey>("totalSolved");
    const [sortDesc, setSortDesc] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(20);

    const handleSort = (key: SortKey) => {
        if (sortKey === key) {
            setSortDesc(!sortDesc);
        } else {
            setSortKey(key);
            setSortDesc(true);
        }
    };

    const handleItemsPerPageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setItemsPerPage(Number(event.target.value));
        setCurrentPage(1); // Reset to first page when items per page changes
    };

    const sortedData = [...data].sort((a, b) => {
        const multiplier = sortDesc ? -1 : 1;
        return (a[sortKey] - b[sortKey]) * multiplier;
    });

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const paginatedData = sortedData.slice(startIndex, endIndex);

    const totalPages = Math.ceil(data.length / itemsPerPage);

    return (
        <div className="overflow-x-auto rounded-lg shadow-lg">
            <table className="min-w-full bg-leetcode-dark text-leetcode-text">
                <thead className="border-b border-gray-800">
                    <tr>
                        <th className="px-6 py-3 text-left">Rank</th>
                        <th className="px-6 py-3 text-left">Name</th>
                        <th
                            className="px-6 py-3 cursor-pointer"
                            onClick={() => handleSort("totalSolved")}
                        >
                            <div className="flex items-center gap-2">
                                <Trophy size={16} />
                                Problems Solved
                                <ArrowUpDown size={16} className="opacity-50" />
                            </div>
                        </th>
                        <th
                            className="px-6 py-3 cursor-pointer"
                            onClick={() => handleSort("ranking")}
                        >
                            <div className="flex items-center gap-2">
                                <Target size={16} />
                                Global Ranking
                                <ArrowUpDown size={16} className="opacity-50" />
                            </div>
                        </th>
                        <th
                            className="px-6 py-3 cursor-pointer"
                            onClick={() => handleSort("acceptanceRate")}
                        >
                            <div className="flex items-center gap-2">
                                <Zap size={16} />
                                Acceptance Rate
                                <ArrowUpDown size={16} className="opacity-50" />
                            </div>
                        </th>
                        <th
                            className="px-6 py-3 cursor-pointer"
                            onClick={() => handleSort("currentStreak")}
                        >
                            <div className="flex items-center gap-2">
                                <Flame
                                    size={16}
                                    fill="currentColor"
                                    className="text-orange-500"
                                />
                                Streak
                                <ArrowUpDown size={16} className="opacity-50" />
                            </div>
                        </th>
                        <th className="px-6 py-3">Progress</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-800">
                    {paginatedData.map((user, index) => (
                        <tr
                            key={user.username}
                            className="hover:bg-gray-800/50"
                        >
                            <td className="px-6 py-4">{startIndex + index + 1}</td>
                            <td className="px-6 py-4 w-1/3">
                                <div>
                                    <div className="font-medium">
                                        {user.displayName}
                                    </div>
                                    <a
                                        href={`https://leetcode.com/${user.username}/`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-sm text-gray-400 hover:text-leetcode-button flex items-center gap-1"
                                    >
                                        {user.username}
                                        <ExternalLink size={12} />
                                    </a>
                                </div>
                            </td>
                            <td className="px-6 py-4">
                                <div className="flex gap-2 justify-center">
                                    <span className="font-semibold">
                                        {user.totalSolved}
                                    </span>
                                    <span className="text-gray-400">
                                        / {user.totalQuestions}
                                    </span>
                                </div>
                            </td>
                            <td className="px-6 py-4 text-center">
                                {user.ranking.toLocaleString()}
                            </td>
                            <td className="px-6 py-4 text-center">
                                {user.acceptanceRate.toFixed(1)}%
                            </td>
                            <td className="px-6 py-4">
                                <div className="flex items-center gap-2 justify-center">
                                    <Flame
                                        size={16}
                                        fill={
                                            user.solvedToday
                                                ? "currentColor"
                                                : "none"
                                        }
                                        className={
                                            user.solvedToday
                                                ? "text-orange-500 animate-pulse drop-shadow-[0_0_8px_rgba(249,115,22,0.7)]"
                                                : "text-gray-500"
                                        }
                                    />
                                    <span
                                        className={
                                            user.solvedToday
                                                ? "font-semibold text-orange-500 animate-pulse drop-shadow-[0_0_8px_rgba(249,115,22,0.7)] px-1"
                                                : "font-semibold text-gray-500 px-1"
                                        }
                                    >
                                        {user.currentStreak}
                                    </span>
                                </div>
                            </td>
                            <td className="px-6 py-4">
                                <div className="flex gap-2 text-sm justify-center">
                                    <span className="text-leetcode-easy">
                                        E: {user.easySolved}
                                    </span>
                                    <span className="text-leetcode-medium">
                                        M: {user.mediumSolved}
                                    </span>
                                    <span className="text-leetcode-hard">
                                        H: {user.hardSolved}
                                    </span>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            
            <div className="flex justify-between items-center m-6">
                <div>
                    <label htmlFor="itemsPerPage" className="mr-2 text-leetcode-text">
                        Items per page:
                    </label>
                    <select
                        id="itemsPerPage"
                        value={itemsPerPage}
                        onChange={handleItemsPerPageChange}
                        className="px-4 py-2 bg-leetcode-dark text-leetcode-text border border-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-leetcode-button"
                    >
                        <option value={20}>20</option>
                        <option value={50}>50</option>
                        <option value={100}>100</option>
                    </select>
                </div>
                <div>
                    <button
                        onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                        disabled={currentPage === 1}
                        className="px-4 py-2 bg-leetcode-button text-white rounded-lg hover:bg-leetcode-hover transition-colors disabled:opacity-50"
                    >
                        Previous
                    </button>
                    <span className="mx-4 text-leetcode-text">
                        Page {currentPage} of {totalPages}
                    </span>
                    <button
                        onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                        disabled={currentPage === totalPages}
                        className="px-4 py-2 bg-leetcode-button text-white rounded-lg hover:bg-leetcode-hover transition-colors disabled:opacity-50"
                    >
                        Next
                    </button>
                </div>
            </div>
        </div>
    );
};