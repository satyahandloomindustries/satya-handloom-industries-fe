import { db } from '@/db';
import { getCategories } from '@/services/CategoryServices';
import { NextResponse } from 'next/server';

export const GET = db(async (req) => {
  try {
    const { categories, mainCategories } = await getCategories();

    return NextResponse.json(
      {
        message: 'Fetched successfully',
        categories,
        mainCategories,
      },
      { status: 200 }
    );
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      {
        message: 'Failed to fetch the categories',
      },
      { status: 404 }
    );
  }
});
