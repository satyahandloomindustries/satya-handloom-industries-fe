import { db } from '@/db';
import { requiredAuth } from '@/services/AuthService';
import { createProduct, getProducts } from '@/services/ProductServices';
import { NextResponse } from 'next/server';

export const POST = db(async (req) => {
  try {
    await requiredAuth(req);
    await createProduct();
    return NextResponse.json(
      {
        message: 'Created the product successfully',
      },
      {
        status: 200,
      }
    );
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      {
        message: err?.message,
      },
      {
        status: 404,
      }
    );
  }
});

export const GET = db(async (req) => {
  try {
    const { searchParams } = new URL(req.url);
    const { category, page, subCategory } = Object.fromEntries(searchParams);

    if (!category) {
      return NextResponse.json(
        {
          message: 'Failed to fetch the products',
        },
        {
          status: 400,
        }
      );
    }
    const products = await getProducts({ category, subCategory });

    return NextResponse.json(
      {
        message: products?.total
          ? 'Products fetched successfully'
          : 'No products present',
        ...products,
      },
      {
        status: 200,
      }
    );
  } catch (err) {
    return NextResponse.json(
      {
        message: err?.message,
      },
      {
        status: 500,
      }
    );
  }
});
