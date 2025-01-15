import {
    ArrowUpDown,
    Crown,
    ExternalLink,
    Flame,
    Medal,
    Target,
    Trophy,
    Zap,
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
        return null;
        if (index === 0) return <Crown className="w-4 h-4 text-yellow-400" />;
        if (index === 1) return <Medal className="w-4 h-4 text-gray-300" />;
        if (index === 2) return <Medal className="w-4 h-4 text-amber-600" />;
    };

    const getProgressBarWidth = (solved: number, total: number) => {
        return `${(solved / total) * 100}%`;
    };

    return (
        <div className="overflow-hidden rounded-xl shadow-2xl">
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-white/20">
                    <thead className="bg-black/50">
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
                    <tbody className="divide-y divide-white/10 bg-black/20">
                        {sortedData.map((user, index) => (
                            <tr
                                key={user.username}
                                className="group hover:bg-white/5 transition-colors duration-200"
                                onMouseEnter={() => setHoveredRow(index)}
                                onMouseLeave={() => setHoveredRow(null)}
                            >
                                <td className="pl-6 pr-0 py-4 whitespace-nowrap min-w-[100px]">
                                    <div className="flex items-center gap-2 justify-between">
                                        {getRankIcon(index)}
                                        <span
                                            className={`font-medium text-lg ${getRankColor(
                                                index
                                            )} ${
                                                hoveredRow === index
                                                    ? "text-leetcode-button"
                                                    : ""
                                            }  transition-colors`}
                                        >
                                            #{index + 1}
                                        </span>
                                        {user.activeBadge && (
                                            <div className="relative group/badge px-1">
                                                <img
                                                    src={user.activeBadge.icon}
                                                    alt={
                                                        user.activeBadge
                                                            .displayName
                                                    }
                                                    className="w-8 h-8 object-contain"
                                                />
                                                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-900 text-xs text-white rounded opacity-0 group-hover/badge:opacity-100 transition-opacity whitespace-nowrap">
                                                    {
                                                        user.activeBadge
                                                            .displayName
                                                    }
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div>
                                        <div className="flex items-center gap-2 font-medium text-lg text-gray-100 group-hover:text-leetcode-button transition-colors">
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
                                        <div className="w-full h-1.5 bg-white/20 rounded-full overflow-hidden">
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
                                    <span className="font-mono text-lg text-gray-100 group-hover:text-leetcode-button transition-colors">
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
                                        }`}
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
                                                    : "text-gray-500"
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
                                            <span className="text-leetcode-easy font-mono text-lg">
                                                {user.easySolved}
                                            </span>
                                            <span className="text-xs text-gray-400">
                                                Easy
                                            </span>
                                        </div>
                                        <div className="flex flex-col items-center group/medium">
                                            <span className="text-leetcode-medium font-mono text-lg">
                                                {user.mediumSolved}
                                            </span>
                                            <span className="text-xs text-gray-400">
                                                Medium
                                            </span>
                                        </div>
                                        <div className="flex flex-col items-center group/hard">
                                            <span className="text-leetcode-hard font-mono text-lg">
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
