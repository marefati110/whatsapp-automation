import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { mkdirSync, readdirSync } from 'fs';
import { resolve } from 'path';
import { SendMessagePayload } from 'src/app/DTOs/app.controller';

import { Client, LocalAuth } from 'whatsapp-web.js';

interface IAccount {
  owner: string;
  client: Client;
}

@Injectable()
export class AccountService {
  private accounts: IAccount[] = [];

  private async initClient(phoneNumber: string) {
    const client = new Client({
      puppeteer: {
        headless: false,
      },
      authStrategy: new LocalAuth({
        clientId: phoneNumber,
        dataPath: 'sessions',
      }),
    });

    return await client.initialize();
  }

  async bootstrap() {
    const path = resolve(__dirname, '../../../sessions');
    mkdirSync(path, { recursive: true });

    const dirItems = readdirSync(path);

    for (const sessionName of dirItems) {
      const phoneNumber = sessionName.replace('session-', '');
      await this.initClient(phoneNumber);
    }
  }

  async inti(phoneNumber: string) {
    // inti web
    const client = new Client({
      puppeteer: {
        headless: false,
      },
      authStrategy: new LocalAuth({
        clientId: phoneNumber,
      }),
    });

    // client.on('qr', (qr) => {
    //   qrcode.generate(qr, { small: true });
    // });

    // client.on('authenticated', (session) => {
    //   console.log(session, client);
    //   console.log(`User ${userId} authenticated!`);
    //   session[userId] = session;
    //   try {
    //     fs.writeFileSync(
    //       path.resolve(__dirname, '../../../../sessions.json'),
    //       JSON.stringify(session, null, 2),
    //     );
    //   } catch {
    //     console.log('I have error on write a session on sessions.json');
    //   }
    // });

    // client.on('disconnected', (reason) => {
    //   console.log(`User ${userId} disconnected: ${reason}`);
    //   delete this.clients[userId];
    // });

    await client.initialize();

    this.accounts.push({
      client,
      owner: phoneNumber,
    });
  }

  async sendMessage(param: SendMessagePayload) {
    const { message, sourcePhoneNumber, targetPhoneNumber } = param;

    const account = this.accounts.find(
      (item) => item.owner === sourcePhoneNumber,
    );

    const client = account?.client;
    if (!client) {
      throw new InternalServerErrorException();
    }

    const res = await client.sendMessage('989028427004@c.us', message);
    console.log('🚀 ~ AccountService ~ sendMessage ~ res:', res);

    return true;
  }
}
