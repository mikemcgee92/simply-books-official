'use client';

import React from 'react';
import { useAuth } from '@/utils/context/authContext';

export default function User() {
  // Grab the user object from the useAuth hook
  const { user } = useAuth();

  return (
    <div>
      <h2>Name: {user.displayName}</h2>
      <h2>Email: {user.email}</h2>
      <img src={user.photoURL} alt={user.displayName} referrerPolicy="no-referrer" />
      <h2>Last signed in: {user.metadata.lastSignInTime}</h2>
    </div>
  );
}
