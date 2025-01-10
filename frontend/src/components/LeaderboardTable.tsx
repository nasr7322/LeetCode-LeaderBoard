import {
    ArrowUpDown,
    ExternalLink,
    Target,
    Trophy,
    Zap,
    Flame,
    Crown,
    Medal,
} from "lucide-react";
import React, { useState } from "react";
import { UserData } from "../types/leetcode";

interface Props {
    data: UserData[];
}

type SortKey = "totalSolved" | "ranking" | "acceptanceRate" | "currentStreak";

export const LeaderboardTable: React.FC<Props> = ({ data }) => {
    const [sortKey, setSortKey] = useState<SortKey>("totalSolved");
    const [sortDesc, setSortDesc] = useState(true);
    const [hoveredRow, setHoveredRow] = useState<number | null>(null);

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

    const getRankColor = (index: number) => {
        switch (index) {
            // case 0:
            //     return "text-yellow-400";
            // case 1:
            //     return "text-gray-300";
            // case 2:
            //     return "text-amber-600";
            default:
                return "text-gray-200";
        }
    };

    const getRankIcon = (index: number) => {
        // if (index === 0) return <Crown className="w-6 h-6 text-yellow-400" />;
        // if (index === 1) return <Medal className="w-6 h-6 text-gray-300" />;
        // if (index === 2) return <Medal className="w-6 h-6 text-amber-600" />;
        return null;
    };

    const getProgressBarWidth = (solved: number, total: number) => {
        return `${(solved / total) * 100}%`;
    };

    return (
        <div className="overflow-hidden rounded-xl shadow-2xl bg-gradient-to-br from-gray-900 to-leetcode-dark border border-gray-800">
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-800">
                    <thead className="bg-black/30">
                        <tr>
                            <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-300">
                                Rank
                            </th>
                            <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-300">
                                Name
                            </th>
                            <th
                                className="px-6 py-4 cursor-pointer group"
                                onClick={() => handleSort("totalSolved")}
                            >
                                <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-gray-300">
                                    <Trophy
                                        size={14}
                                        className="text-leetcode-button"
                                    />
                                    Problems
                                    <ArrowUpDown
                                        size={14}
                                        className="opacity-50 group-hover:opacity-100 transition-opacity"
                                    />
                                </div>
                            </th>
                            <th
                                className="px-6 py-4 cursor-pointer group"
                                onClick={() => handleSort("ranking")}
                            >
                                <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-gray-300">
                                    <Target
                                        size={14}
                                        className="text-blue-500"
                                    />
                                    Global Rank
                                    <ArrowUpDown
                                        size={14}
                                        className="opacity-50 group-hover:opacity-100 transition-opacity"
                                    />
                                </div>
                            </th>
                            <th
                                className="px-6 py-4 cursor-pointer group"
                                onClick={() => handleSort("acceptanceRate")}
                            >
                                <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-gray-300">
                                    <Zap
                                        size={14}
                                        className="text-purple-500"
                                    />
                                    Success Rate
                                    <ArrowUpDown
                                        size={14}
                                        className="opacity-50 group-hover:opacity-100 transition-opacity"
                                    />
                                </div>
                            </th>
                            <th
                                className="px-6 py-4 cursor-pointer group"
                                onClick={() => handleSort("currentStreak")}
                            >
                                <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-gray-300">
                                    <Flame
                                        size={14}
                                        className="text-orange-500"
                                    />
                                    Streak
                                    <ArrowUpDown
                                        size={14}
                                        className="opacity-50 group-hover:opacity-100 transition-opacity"
                                    />
                                </div>
                            </th>
                            <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-gray-300">
                                Progress
                            </th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-800/50 bg-black/20">
                        {sortedData.map((user, index) => (
                            <tr
                                key={user.username}
                                className="group hover:bg-white/5 transition-colors duration-200"
                                onMouseEnter={() => setHoveredRow(index)}
                                onMouseLeave={() => setHoveredRow(null)}
                            >
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="flex items-center gap-2">
                                        {getRankIcon(index)}
                                        <span
                                            className={`font-mono text-lg ${getRankColor(
                                                index
                                            )} ${
                                                hoveredRow === index
                                                    ? "scale-110"
                                                    : ""
                                            } transition-transform duration-200`}
                                        >
                                            #{index + 1}
                                        </span>
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div>
                                        <div className="font-medium text-lg text-gray-100 group-hover:text-leetcode-button transition-colors">
                                            {user.displayName}
                                        </div>
                                        <a
                                            href={`https://leetcode.com/${user.username}/`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-sm text-gray-400 hover:text-leetcode-button flex items-center gap-1 transition-colors"
                                        >
                                            {user.username}
                                            <ExternalLink size={12} />
                                        </a>
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="flex flex-col gap-1">
                                        <div className="flex items-center gap-2">
                                            <span className="font-mono text-lg font-semibold text-gray-100">
                                                {user.totalSolved}
                                            </span>
                                            <span className="text-gray-400">
                                                / {user.totalQuestions}
                                            </span>
                                        </div>
                                        <div className="w-full h-1.5 bg-gray-800 rounded-full overflow-hidden">
                                            <div
                                                className="h-full bg-gradient-to-r from-leetcode-button to-green-400 rounded-full transition-all duration-500 ease-out"
                                                style={{
                                                    width: getProgressBarWidth(
                                                        user.totalSolved,
                                                        user.totalQuestions
                                                    ),
                                                }}
                                            />
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-center">
                                    <span className="font-mono text-lg text-gray-100 group-hover:scale-110 transition-transform duration-200 inline-block">
                                        {user.ranking.toLocaleString()}
                                    </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-center">
                                    <span
                                        className={`font-mono text-lg ${
                                            user.acceptanceRate >= 70
                                                ? "text-green-400"
                                                : user.acceptanceRate >= 50
                                                ? "text-yellow-400"
                                                : "text-red-400"
                                        } group-hover:scale-110 transition-transform duration-200 inline-block`}
                                    >
                                        {user.acceptanceRate.toFixed(1)}%
                                    </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="flex items-center gap-2">
                                        <Flame
                                            size={18}
                                            fill={
                                                user.solvedToday
                                                    ? "currentColor"
                                                    : "none"
                                            }
                                            className={`transition-all duration-300 ${
                                                user.solvedToday
                                                    ? "text-orange-500 animate-pulse drop-shadow-[0_0_8px_rgba(249,115,22,0.7)] group-hover:scale-125"
                                                    : "text-gray-500 group-hover:scale-110"
                                            }`}
                                        />
                                        <span
                                            className={`font-mono text-lg ${
                                                user.solvedToday
                                                    ? "text-orange-500 animate-pulse drop-shadow-[0_0_8px_rgba(249,115,22,0.7)]"
                                                    : "text-gray-500"
                                            }`}
                                        >
                                            {user.currentStreak}
                                        </span>
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="flex gap-4 items-center">
                                        <div className="flex flex-col items-center group/easy">
                                            <span className="text-leetcode-easy font-mono text-lg group-hover/easy:scale-110 transition-transform">
                                                {user.easySolved}
                                            </span>
                                            <span className="text-xs text-gray-400">
                                                Easy
                                            </span>
                                        </div>
                                        <div className="flex flex-col items-center group/medium">
                                            <span className="text-leetcode-medium font-mono text-lg group-hover/medium:scale-110 transition-transform">
                                                {user.mediumSolved}
                                            </span>
                                            <span className="text-xs text-gray-400">
                                                Medium
                                            </span>
                                        </div>
                                        <div className="flex flex-col items-center group/hard">
                                            <span className="text-leetcode-hard font-mono text-lg group-hover/hard:scale-110 transition-transform">
                                                {user.hardSolved}
                                            </span>
                                            <span className="text-xs text-gray-400">
                                                Hard
                                            </span>
                                        </div>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};
