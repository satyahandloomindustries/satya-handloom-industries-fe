import { db } from '@/db';
import TemporaryProduct from '@/models/TemporaryProduct';
import { requiredAuth } from '@/services/AuthService';
import { findMainCategory } from '@/services/CategoryServices';
import { fetchAllTemporaryImages } from '@/services/ImageService';
import { NextResponse } from 'next/server';

export const POST = db(async (req) => {
  try {
    await requiredAuth(req);
    const { name, code, category, subCategory, sizes, description } =
      await req.json();

    let temporyProduct = await TemporaryProduct.findOne();
    let message = 'Temporary product created successfully!';

    if (!temporyProduct) {
      temporyProduct = await TemporaryProduct.create({
        name,
        code,
        category,
        subCategory,
        sizes,
        description,
        images: [],
      });
    } else {
      temporyProduct = await TemporaryProduct.findOneAndUpdate(
        {},
        {
          name,
          code,
          category,
          subCategory,
          sizes,
          description,
        }
      );
      message = 'Temporary product updated successfully!';
    }
    return NextResponse.json(
      {
        message,
        ...temporyProduct,
      },
      { status: 200 }
    );
  } catch (err) {
    return NextResponse.json(
      {
        message: 'Failed to create the temporary product',
      },
      { status: 400 }
    );
  }
});

export const GET = db(async (req) => {
  try {
    await requiredAuth(req);

    const temporaryProduct = await TemporaryProduct.findOne({}).lean();

    if (temporaryProduct) {
      const category = await findMainCategory(temporaryProduct.category);

      const subCategory = await findMainCategory(temporaryProduct.subCategory);
      return NextResponse.json({
        status: 200,
        message: 'Fetched successfully!',
        ...temporaryProduct,
        category: category.name,
        categoryId: category._id.toString(),
        subCategory: subCategory.name,
        subCategoryId: subCategory._id.toString(),
      });
    }

    return NextResponse.json(
      {
        message: 'Temporary product not present',
      },
      { status: 404 }
    );
  } catch (err) {
    console.log(err);

    return NextResponse.json(
      {
        message: 'Failed to fetch the temporary product',
      },
      { status: 500 }
    );
  }
});
