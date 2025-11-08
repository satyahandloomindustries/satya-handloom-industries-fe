import { v2 as cloudinary } from 'cloudinary';
import hamming from 'hamming-distance';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export default cloudinary;

const checkDuplicates = (phash1, phash2) => {
  const distance = hamming(phash1, phash2);
  return { similar: distance < 10, distance };
};

export const multipleImagesCheck = (phashes = []) => {
  const uniqueFiles = [];
  for (let i = 0; i < phashes.length; i++) {
    let isDuplicate = false;
    for (let j = 0; j < uniqueFiles.length; j++) {
      const { similar } = checkDuplicates(
        phashes[i].phash,
        uniqueFiles[j].phash
      );
      if (similar) {
        isDuplicate = true;
        break;
      }
    }
    if (!isDuplicate) uniqueFiles.push(phashes[i]);
  }
  return uniqueFiles;
};
