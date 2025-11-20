import ProductImages from '@/models/ProductImages';
import TemporaryImages from '@/models/TemporaryImages';
import { checkDuplicates } from '@/services/CloudinaryServices';

export const fetchAllImages = async () => {
  try {
    const images = await ProductImages.find({});
    return images;
  } catch (err) {
    throw new Error('Failed to fetch the images successfully');
  }
};

export const dbDuplicateImages = async (uploadedToCloudinary = []) => {
  if (!uploadedToCloudinary?.length)
    return { original: [], duplicates: [], presentImageRef: [] };

  try {
    const images = await fetchAllImages();
    const duplicates = [];
    const original = [];
    const presentImageRef = [];
    uploadedToCloudinary.forEach((item) => {
      let isDuplicate = false;

      for (let i = 0; i < images.length; i++) {
        const { similar } = checkDuplicates(item.phash, images[i].phash);
        if (similar) {
          duplicates.push(item);
          isDuplicate = true;
          presentImageRef.push(images[i]);
          break;
        }
      }
      if (!isDuplicate) {
        original.push(item);
      }
    });
    return {
      original,
      duplicates,
      presentImageRef,
    };
  } catch (err) {
    throw new Error('Failed to check the duplicates');
  }
};

export const fetchAllTemporaryImages = async () => {
  try {
    const images = await TemporaryImages.find({}).lean();
    return images;
  } catch (err) {
    throw new Error('Failed to fetch temporary images');
  }
};

export const createProductImages = async () => {
  try {
    const temporaryImages = await TemporaryImages.find({}).lean();
    const productImages = await ProductImages.insertMany(temporaryImages);
    return productImages;
  } catch (err) {
    throw new Error('Failed to create productImages');
  }
};
