import React from "react";
import { Code2 } from "lucide-react";

export const Header: React.FC = () => (
    <div className="flex flex-col items-center gap-4 mb-12 text-center">
        <div className="relative">
            <div className="absolute inset-0 blur-xl bg-gradient-to-r from-leetcode-button/30 to-leetcode-easy/30"></div>
            <Code2
                size={48}
                className="relative text-leetcode-button drop-shadow-lg"
            />
        </div>
        <div>
            <h1 className="text-4xl font-bold text-leetcode-text bg-gradient-to-r from-leetcode-button to-leetcode-easy bg-clip-text text-transparent">
                LeetCode Leaderboard
            </h1>
            {/* <p className="text-gray-400 mt-2">
                طبق اليوم - Daily Progress Tracker
            </p> */}
        </div>
    </div>
);
