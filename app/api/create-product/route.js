import { db } from '@/db';
import { requiredAuth } from '@/services/AuthService';
import { createProduct } from '@/services/ProductServices';
import { NextResponse } from 'next/server';

export const POST = db(async (req) => {
  try {
    await requiredAuth(req);
    await createProduct();
    return NextResponse.json({
      status: 200,
      message: 'Fetched successfully',
    });
  } catch (err) {
    console.log(err);
    return NextResponse.json({
      status: 404,
      message: err?.message,
    });
  }
});
