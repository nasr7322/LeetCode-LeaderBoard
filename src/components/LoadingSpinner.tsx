import React from 'react';

export const LoadingSpinner: React.FC = () => (
  <div className="text-center py-8">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-leetcode-button mx-auto"></div>
    <p className="mt-4 text-leetcode-text">Loading leaderboard data...</p>
  </div>
);