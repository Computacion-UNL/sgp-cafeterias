import { BadRequestError } from "@cafetho/shared";
import { Request } from "express";
import multer, { FileFilterCallback } from "multer";

export const SUPPORTED_IMAGE_FORMATS = ["image/jpg", "image/jpeg", "image/png"];

const storage = multer.diskStorage({});

const fileFilter = (
  req: Request,
  file: Express.Multer.File,
  cb: FileFilterCallback
) => {
  if (!SUPPORTED_IMAGE_FORMATS.includes(file.mimetype)) {
    cb(new BadRequestError("Tipo de archivo no soportado"));
    return;
  }
  cb(null, true);
};

export const upload = multer({ storage, fileFilter });
