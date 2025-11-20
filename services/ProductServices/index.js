import Products from '@/models/Products';
import TemporaryImages from '@/models/TemporaryImages';
import TemporaryProduct from '@/models/TemporaryProduct';
import { createProductImages } from '@/services/ImageService';

export const findProductByCode = async (code) => {
  try {
    if (!code) throw new Error('Code is not provided');
    const exists = await Products.findOne({ code });
    return !!exists;
  } catch (err) {
    throw new Error(err?.message);
  }
};

export const createProduct = async () => {
  try {
    const { temporaryProduct, temporaryImages } =
      await fetchTemporaryProductAndImages();
    if (!temporaryProduct) throw new Error('No product exists');
    if (!temporaryImages) throw new Error('No images present');

    const { code } = temporaryProduct;
    const doesProductCodeExists = await findProductByCode(code);
    if (doesProductCodeExists)
      throw new Error('Product with similar code Exists');

    const productImages = await createProductImages();
    const images = productImages.map((item) => item?._id);
    const { _id, __v, ...data } = { ...temporaryProduct, images };
    const newProduct = await Products.create(data);
    await TemporaryProduct.deleteOne({});
    await TemporaryImages.deleteMany({});
    return newProduct;
  } catch (err) {
    console.log(err);

    throw new Error('Failed to create new product');
  }
};

export const fetchTemporaryProductAndImages = async () => {
  try {
    const temporaryProduct = await TemporaryProduct.findOne({}).lean();
    const temporaryImages = await TemporaryImages.find({});
    return { temporaryProduct, temporaryImages };
  } catch (err) {
    throw new Error(err?.message);
  }
};
