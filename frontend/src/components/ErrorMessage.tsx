import React from 'react';

interface Props {
  message: string;
}

export const ErrorMessage: React.FC<Props> = ({ message }) => (
  <div className="bg-red-900/20 border border-red-900/30 text-red-400 px-4 py-3 rounded">
    {message}
  </div>
);