import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME!,
  api_key: process.env.API_KEY!,
  api_secret: process.env.API_SECRET!,
});

export const cloudUpload = (file: string, folder: string) =>
  cloudinary.uploader.upload(file, { folder });

export const cloudDestroy = (public_id: string) =>
  cloudinary.uploader.destroy(public_id);
