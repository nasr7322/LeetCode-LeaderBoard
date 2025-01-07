import {
    ArrowUpDown,
    ExternalLink,
    Target,
    Trophy,
    Zap,
    Flame,
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

    const handleSort = (key: SortKey) => {
        if (sortKey === key) {
            setSortDesc(!sortDesc);
        } else {
            setSortKey(key);
            setSortDesc(true);
        }
    };

    const sortedData = [...data].sort((a, b) => {
        const multiplier = sortDesc ? -1 : 1;
        return (a[sortKey] - b[sortKey]) * multiplier;
    });

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
                    {sortedData.map((user, index) => (
                        <tr
                            key={user.username}
                            className="hover:bg-gray-800/50"
                        >
                            <td className="px-6 py-4">{index + 1}</td>
                            <td className="px-6 py-4">
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
                                <div className="flex gap-2">
                                    <span className="font-semibold">
                                        {user.totalSolved}
                                    </span>
                                    <span className="text-gray-400">
                                        / {user.totalQuestions}
                                    </span>
                                </div>
                            </td>
                            <td className="px-6 py-4">
                                {user.ranking.toLocaleString()}
                            </td>
                            <td className="px-6 py-4">
                                {user.acceptanceRate.toFixed(1)}%
                            </td>
                            <td className="px-6 py-4">
                                <div className="flex items-center gap-2">
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
                                                ? "font-semibold text-orange-500 animate-pulse drop-shadow-[0_0_8px_rgba(249,115,22,0.7)]"
                                                : "font-semibold text-gray-500"
                                        }
                                    >
                                        {user.currentStreak}
                                    </span>
                                </div>
                            </td>
                            <td className="px-6 py-4">
                                <div className="flex gap-2 text-sm">
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
        </div>
    );
};
