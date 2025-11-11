import { v2 as cloudinary } from 'cloudinary';
import hamming from 'hamming-distance';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export default cloudinary;

export const checkDuplicates = (phash1, phash2) => {
  const distance = hamming(phash1, phash2);
  return { similar: distance < 2, distance };
};

export const multipleImagesCheck = (phashes = []) => {
  const uniqueFiles = [];
  const duplicates = [];
  for (let i = 0; i < phashes.length; i++) {
    let isDuplicate = false;
    for (let j = 0; j < uniqueFiles.length; j++) {
      const { similar, distance } = checkDuplicates(
        phashes[i].phash,
        uniqueFiles[j].phash
      );
      if (similar) {
        isDuplicate = true;
        duplicates.push(phashes[i]);
        break;
      }
    }
    if (!isDuplicate) uniqueFiles.push(phashes[i]);
  }
  return { uniqueFiles, duplicates };
};

export const deleteCloudinaryImages = async (publicIds = []) => {
  if (!publicIds?.length) {
    return;
  }
  try {
    const result = await cloudinary.api.delete_resources(publicIds);
  } catch (error) {
    console.error('Error deleting images:', error);
  }
};
