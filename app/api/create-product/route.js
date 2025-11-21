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
    const { category, subCategory } = await req.json();

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

    console.log(products);
    
    return NextResponse.json(
      {
        message: 'Products fetched successfully',
        products,
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
