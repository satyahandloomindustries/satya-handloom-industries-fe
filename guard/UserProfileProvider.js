'use client';
import useUser from '@/store/useUser';
import { useEffect } from 'react';

export const UserProfileProvider = ({ children }) => {
  const { fetchUser } = useUser();
  useEffect(() => {
    fetchUser();
  }, []);

  return children;
};
