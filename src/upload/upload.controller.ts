import {
  Body,
  Controller,
  Post,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { UploadService } from './upload.service';

@Controller('upload')
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  @Post()
  @UseInterceptors(FilesInterceptor('file'))
  uploadImg(@UploadedFiles() img) {
    return this.uploadService.uploadImg(img[0]);
  }

  @Post('/delete')
  deleteImg(@Body() req) {
    return this.uploadService.deleteImg(req);
  }
}
