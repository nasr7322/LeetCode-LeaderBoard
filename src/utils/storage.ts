const STORAGE_KEY = 'leetcode_users';

export const getStoredUsers = (): UserProfile[] => {
  const stored = localStorage.getItem(STORAGE_KEY);
  return stored ? JSON.parse(stored) : [{ username: 'nasr7322', displayName: 'Nasr' }];
};

export const addUser = (username: string, displayName: string): UserProfile[] => {
  const users = getStoredUsers();
  if (!users.some(user => user.username === username)) {
    users.push({ username, displayName });
    localStorage.setItem(STORAGE_KEY, JSON.stringify(users));
  }
  return users;
};

export const removeUser = (username: string): UserProfile[] => {
  const users = getStoredUsers();
  const filteredUsers = users.filter(user => user.username !== username);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(filteredUsers));
  return filteredUsers;
};