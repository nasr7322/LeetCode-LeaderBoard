import { Code2 } from "lucide-react";
import React from "react";

export const Header: React.FC = () => (
    <div className="flex flex-col items-center gap-4 mb-12 text-center">
        <div className="relative">
            <div className="absolute inset-0 blur-xl animate-gradientbg opacity-45 scale-80">
            </div><Code2
                size={48}
                className="relative text-leetcode-easy animate-gradient drop-shadow-lg"
            />
        </div>
        <div>
            <h1 className="text-4xl font-bold text-leetcode-text bg-clip-text">
                LeetCode Leaderboard
            </h1>
            {<p className="text-gray-400 mt-2">
                طبق اليوم - Daily Progress Tracker
            </p>}
        </div>
    </div>
);
