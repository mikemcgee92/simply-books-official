'use client';

import React from 'react';
import { useAuth } from '@/utils/context/authContext';

export default function User() {
  const { user } = useAuth();
  console.log(user);

  return (
    <div>
      <h2>Name: {user.displayName}</h2>
      <h2>Email: {user.email}</h2>
      <img src={user.photoURL} alt={user.displayName} />
    </div>
  );
}
