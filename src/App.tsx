import React, { useState, useCallback } from 'react';
import { useLeetCode } from './hooks/useLeetCode';
import { LeaderboardTable } from './components/LeaderboardTable';
import { AddUserForm } from './components/AddUserForm';
import { LoadingSpinner } from './components/LoadingSpinner';
import { ErrorMessage } from './components/ErrorMessage';
import { Header } from './components/Header';
import { getStoredUsers, addUser, removeUser } from './utils/storage';
import { UserProfile } from './types/user';

export function App() {
  const [users, setUsers] = useState<UserProfile[]>(getStoredUsers());
  const { userData, loading, error } = useLeetCode(users);

  const handleAddUser = useCallback((username: string, displayName: string) => {
    setUsers(addUser(username, displayName));
  }, []);

  const handleRemoveUser = useCallback((username: string) => {
    setUsers(removeUser(username));
  }, []);

  return (
    <div className="min-h-screen bg-leetcode-dark">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <Header />
        <AddUserForm onAdd={handleAddUser} />
        
        {loading && <LoadingSpinner />}
        {error && <ErrorMessage message={error} />}
        {!loading && !error && <LeaderboardTable data={userData} onRemoveUser={handleRemoveUser} />}
      </div>
    </div>
  );
}

export default App;