import { Injectable } from '@nestjs/common';

@Injectable()
export class HandlerService {
  async handleQrCode(qr: string) {}
}