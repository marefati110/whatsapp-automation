import fs from 'fs';
import path from 'path';
import { Injectable } from '@nestjs/common';
import { Client, LocalAuth } from 'whatsapp-web.js';
import qrcode from 'qrcode-terminal';

// let sessions = {};

// try {
//   const sessionsPath = path.resolve(__dirname, '../../../../sessions.json');
//   sessions = JSON.parse(fs.readFileSync(sessionsPath, 'utf8'));
// } catch {
//   console.log('No sessions found, starting fresh.');
// }

@Injectable()
export class UserService {
  private clients: { [key: string]: Client } = {};

  constructor() {}

  initilizeClient = (userId: string) => {
    userId = '989028427004@c.us';

    if (this.clients[userId]) {
      console.log(`Client for user ${userId} is already initialized.`);
      return;
    }

    const client = new Client({
      puppeteer: {
        headless: true,
      },
      authStrategy: new LocalAuth({
        clientId: 'YOUR_CLIENT_ID',
      }),
      // session: sessions[userId] || undefined,
    });

    this.clients[userId] = client;

    client.initialize();

    client.on('qr', (qr) => {
      console.log(`QR code for user ${userId}: ${qr}`);

      qrcode.generate(qr, { small: true });
    });

    client.on('authenticated', (session) => {
      console.log(session, client);
      console.log(`User ${userId} authenticated!`);
      sessions[userId] = session;
      try {
        fs.writeFileSync(
          path.resolve(__dirname, '../../../../sessions.json'),
          JSON.stringify(sessions, null, 2),
        );
      } catch {
        console.log('I have error on write a session on sessions.json');
      }
    });

    client.on('disconnected', (reason) => {
      console.log(`User ${userId} disconnected: ${reason}`);
      delete this.clients[userId];
    });
  };
}
