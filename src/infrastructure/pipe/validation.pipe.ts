import { Injectable, ValidationPipe as OriginalPipe } from '@nestjs/common';

@Injectable()
export class ValidationPipe extends OriginalPipe {
  constructor() {
    super({ transform: true, whitelist: true, validateCustomDecorators: true });
  }
}
