import { AUTH_TOKEN } from '@/constants';
import { db } from '@/db';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export const POST = db(() => {
  const cookieStore = cookies();
  cookieStore.delete(AUTH_TOKEN);
  return NextResponse.json(
    { message: 'User logged out successfully' },
    { status: 200 }
  );
});
