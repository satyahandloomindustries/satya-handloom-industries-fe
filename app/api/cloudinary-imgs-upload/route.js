import { NextResponse } from "next/server";
import cloudinary from "@/services/CloudinaryServices";
import { CLOUDINARY_IMAGES_BASE_FOLDER } from "@/constants";

export async function POST(request) {
  const formData = await request.formData();

  const files = formData.getAll("images");
  const productCategory = formData.get('category');

  
  if (!files || files.length === 0) {
    return NextResponse.json({ error: "No files uploaded" }, { status: 400 });
  }

  
  const folder = `${CLOUDINARY_IMAGES_BASE_FOLDER}/${productCategory}`;
  
  const uploadPromises = files.map(async(file) => {
    const buffer = Buffer.from(await file.arrayBuffer());
    return new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        { folder},
        (error, result) => {
          if (error) reject(error);
          else resolve(result.secure_url);
        }
      );
      stream.end(buffer);
    });
  });

  try {
    const uploadedUrls = await Promise.all(uploadPromises);
    return NextResponse.json({ urls: uploadedUrls });
  } catch (error) {    
    return NextResponse.json({ error: "Upload failed", details: error }, { status: 500 });
  }
}
