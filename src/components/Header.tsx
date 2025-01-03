import React from 'react';
import { Code2 } from 'lucide-react';

export const Header: React.FC = () => (
  <div className="flex items-center gap-3 mb-8">
    <Code2 size={32} className="text-leetcode-button" />
    <h1 className="text-3xl font-bold text-leetcode-text">LeetCode Leaderboard</h1>
  </div>
);