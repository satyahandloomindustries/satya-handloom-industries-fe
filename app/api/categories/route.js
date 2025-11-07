import { db } from '@/db';
import { requiredAuth } from '@/services/AuthService';
import { getCategories } from '@/services/CategoryServices';
import { NextResponse } from 'next/server';

export const GET = db(async (req) => {
  try {
    await requiredAuth(req);
    const { categories, mainCategories } = await getCategories();

    return NextResponse.json({
      status: 200,
      message: 'Fetched successfully',
      categories,
      mainCategories,
    });
  } catch (err) {
    return NextResponse.json({
      status: 404,
      message: 'Failed to fetch the categories',
    });
  }
});
