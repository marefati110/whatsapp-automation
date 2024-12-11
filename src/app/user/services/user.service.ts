import fs from 'fs';
import path from 'path';
import { Injectable } from '@nestjs/common';
import { Client } from 'whatsapp-web.js';
import qrcode from 'qrcode-terminal';

@Injectable()
export class UserService {
  private clients: { [key: string]: Client } = {};

  constructor() {}

  initializeClient = (userId: string) => {
    userId = '989028427004@c.us';

    if (this.clients[userId]) {
      console.log(`Client for user ${userId} is already initialized.`);
      return;
    }

    const client = new Client({
      puppeteer: {
        headless: true,
      },
      // authStrategy: new LocalAuth({
      //   clientId: 'YOUR_CLIENT_ID',
      // }),
      // session: sessions[userId] || undefined,
    });

    this.clients[userId] = client;

    client.on('qr', (qr) => {
      console.log(`QR code for user ${userId}: ${qr}`);

      qrcode.generate(qr, { small: true });
    });

    client.on('authenticated', (session) => {
      console.log(session, client);
      console.log(`User ${userId} authenticated!`);
      try {
        fs.writeFileSync(
          path.resolve(__dirname, '../../../../sessions.json'),
          JSON.stringify(session, null, 2),
        );
      } catch {
        console.log('I have error on write a session on sessions.json');
      }
    });

    client.on('disconnected', (reason) => {
      console.log(`User ${userId} disconnected: ${reason}`);
      delete this.clients[userId];
    });

    client.initialize();
  };
}
