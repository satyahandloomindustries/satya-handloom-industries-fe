import { db } from '@/db';
import { requiredAuth } from '@/services/AuthService';
import { getSubcategorySizes } from '@/services/CategoryServices';
import { NextResponse } from 'next/server';

export const GET = db(async (req) => {
  try {
    await requiredAuth(req);
    const categorySizes = await getSubcategorySizes();

    return NextResponse.json({
      status: 200,
      message: 'Fetched successfully',
      categorySizes,
    });
  } catch (err) {
    return NextResponse.json({
      status: 404,
      message: 'Failed to fetch the categories',
    });
  }
});
