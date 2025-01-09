import React from 'react';
import { Code2 } from 'lucide-react';

export const LoadingSpinner: React.FC = () => (
  <div className="flex flex-col items-center justify-center py-12">
    <div className="relative">
      <Code2 size={48} className="text-leetcode-button animate-pulse" />
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-6 h-6 border-4 border-transparent border-t-leetcode-button rounded-full animate-spin"></div>
      </div>
    </div>
    
    <div className="mt-8 bg-[#282c34] rounded-lg p-4 max-w-md w-full overflow-hidden">
      <div className="flex gap-2 mb-3">
        <div className="w-3 h-3 rounded-full bg-red-500"></div>
        <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
        <div className="w-3 h-3 rounded-full bg-green-500"></div>
      </div>
      
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <div className="w-16 h-4 bg-leetcode-button/20 rounded animate-pulse"></div>
          <div className="flex-1 h-4 bg-leetcode-button/10 rounded animate-pulse delay-100"></div>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-24 h-4 bg-leetcode-button/20 rounded animate-pulse delay-200"></div>
          <div className="flex-1 h-4 bg-leetcode-button/10 rounded animate-pulse delay-300"></div>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-20 h-4 bg-leetcode-button/20 rounded animate-pulse delay-400"></div>
          <div className="flex-1 h-4 bg-leetcode-button/10 rounded animate-pulse delay-500"></div>
        </div>
      </div>
    </div>
    
    <p className="mt-4 text-leetcode-text font-mono text-sm">
      <span className="animate-pulse">Fetching leaderboard data</span>
      <span className="animate-[blink_1s_infinite]">...</span>
    </p>
  </div>
);