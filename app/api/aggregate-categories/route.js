import { db } from '@/db';
import { requiredAuth } from '@/services/AuthService';
import { aggregateCategories } from '@/services/CategoryServices';
import { NextResponse } from 'next/server';

export const GET = db(async (req) => {
  try {
    const categories = await aggregateCategories();

    return NextResponse.json(
      {
        message: 'Fetched successfully',
        categories,
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
