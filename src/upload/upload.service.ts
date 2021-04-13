import { Injectable } from '@nestjs/common';
import * as Cloudinary from 'cloudinary';

const cloudinary = Cloudinary.v2;
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

@Injectable()
export class UploadService {
  async uploadImg(img): Promise<any> {
    return new Promise((resolve, reject) => {
      cloudinary.uploader
        .upload_stream({ folder: 'Image' }, (err, result) => {
          if (result) {
            resolve(result);
          } else {
            reject(err);
          }
        })
        .end(img.buffer);
    });
  }

  async deleteImg(req): Promise<any> {
    await cloudinary.uploader.destroy(req.link);
  }
}
