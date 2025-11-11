import { NextResponse } from 'next/server';
import cloudinary, {
  deleteCloudinaryImages,
  multipleImagesCheck,
} from '@/services/CloudinaryServices';
import { CLOUDINARY_IMAGES_BASE_FOLDER } from '@/constants';
import { dbDuplicateImages } from '@/services/ImageService';
import TemporaryImages from '@/models/TemporaryImages';

export async function POST(request) {
  const formData = await request.formData();

  const files = formData.getAll('images');
  const productCategory = formData.get('category');

  if (productCategory === 'null')
    return NextResponse.json(
      { error: 'Product category not provided' },
      { status: 400 }
    );

  if (!files || files.length === 0) {
    return NextResponse.json({ error: 'No files uploaded' }, { status: 400 });
  }

  const folder = `${CLOUDINARY_IMAGES_BASE_FOLDER}/${productCategory}`;

  const uploadPromises = files.map(async (file) => {
    const buffer = Buffer.from(await file.arrayBuffer());
    return new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        { folder, phash: true },
        (error, result) => {
          if (error) reject(error);
          else
            resolve({
              url: result.secure_url,
              phash: result.phash,
              publicId: result.public_id,
              width: result.width,
              height: result.height,
              format: result.format,
              bytes: result.bytes,
              assetFolder: result.asset_folder,
            });
        }
      );
      stream.end(buffer);
    });
  });

  try {
    const uploadedUrls = await Promise.all(uploadPromises);

    const { uniqueFiles, duplicates } = multipleImagesCheck(uploadedUrls);

    const {
      original,
      duplicates: duplicatesComparedWithDb,
      presentImageRef,
    } = await dbDuplicateImages(uniqueFiles);
    const deleteDuplicates = [...duplicates, ...duplicatesComparedWithDb].map(
      ({ publicId }) => publicId
    );

    await deleteCloudinaryImages(deleteDuplicates);
    const images = await TemporaryImages.insertMany([
      ...original,
      ...presentImageRef,
    ]);

    return NextResponse.json({ urls: images }, { status: 200 });
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      { error: 'Upload failed', details: error },
      { status: 500 }
    );
  }
}
