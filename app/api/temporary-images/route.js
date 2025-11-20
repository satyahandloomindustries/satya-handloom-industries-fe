import { db } from '@/db';
import { requiredAuth } from '@/services/AuthService';
import { fetchAllTemporaryImages } from '@/services/ImageService';
import { NextResponse } from 'next/server';

export const GET = db(async (req) => {
  try {
    await requiredAuth(req);

    const images = await fetchAllTemporaryImages();
    return NextResponse.json({ images }, { status: 200 });
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      { message: 'Failed to fetch images' },
      { status: 500 }
    );
  }
});
