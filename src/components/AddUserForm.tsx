import React, { useState } from 'react';
import { UserPlus } from 'lucide-react';

interface Props {
  onAdd: (username: string, displayName: string) => void;
}

export const AddUserForm: React.FC<Props> = ({ onAdd }) => {
  const [username, setUsername] = useState('');
  const [displayName, setDisplayName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (username.trim() && displayName.trim()) {
      onAdd(username.trim(), displayName.trim());
      setUsername('');
      setDisplayName('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 mb-6">
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="LeetCode username"
        className="flex-1 px-4 py-2 bg-leetcode-dark text-leetcode-text border border-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-leetcode-button"
      />
      <input
        type="text"
        value={displayName}
        onChange={(e) => setDisplayName(e.target.value)}
        placeholder="Display name"
        className="flex-1 px-4 py-2 bg-leetcode-dark text-leetcode-text border border-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-leetcode-button"
      />
      <button
        type="submit"
        className="flex items-center gap-2 px-4 py-2 bg-leetcode-button text-white rounded-lg hover:bg-leetcode-hover transition-colors"
      >
        <UserPlus size={20} />
        Add User
      </button>
    </form>
  );
};