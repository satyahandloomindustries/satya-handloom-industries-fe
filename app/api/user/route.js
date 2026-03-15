import { AUTH_TOKEN } from '@/constants';
import { db } from '@/db';
import { verifyToken } from '@/services/JWTServices';
import { getUser } from '@/services/UserServices';
import { NextResponse } from 'next/server';

export const GET = db(async (req) => {
  const cookie = req.cookies;
  const authToken = cookie.get(AUTH_TOKEN)?.value;

  if (!authToken) {
    return NextResponse.json({ message: 'Email is required' }, { status: 404 });
  }
  const { payload } = await verifyToken(authToken);

  const { email } = payload;

  const user = await getUser(email);
  if (!user) {
    return NextResponse.json(
      { message: 'User does not exist' },
      { status: 404 }
    );
  }
  return NextResponse.json(
    {
      message: 'User fetched successfully',
      user,
    },
    { status: 200 }
  );
});
