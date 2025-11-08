import { db } from '@/db';
import TemporaryProduct from '@/models/TemporaryProduct';
import { requiredAuth } from '@/services/AuthService';
import { findMainCategory } from '@/services/CategoryServices';
import { NextResponse } from 'next/server';

export const POST = db(async (req) => {
  try {
    await requiredAuth(req);
    const { name, code, category, subCategory, sizes, description } =
      await req.json();

    let temporyProduct = await TemporaryProduct.findOne();

    if (!temporyProduct) {
      temporyProduct = await TemporaryProduct.create({
        name,
        code,
        category,
        subCategory,
        sizes,
        description,
      });
    }
    return NextResponse.json({
      status: 200,
      message: 'Temporary product created successfully!',
      ...temporyProduct,
    });
  } catch (err) {
    return NextResponse.json({
      status: 400,
      message: 'Failed to create the temporary product',
    });
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
        subCategoryId: subCategory._id.toString()
      });
    }

    return NextResponse.json({
      status: 404,
      message: 'Temporary product not present',
    });
  } catch (err) {
    return NextResponse.json({
      status: 400,
      message: 'Failed to fetch the temporary product',
    });
  }
});
