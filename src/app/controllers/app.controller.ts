import { Body, Controller, Post } from '@nestjs/common';
import { LoginPayload, SendMessagePayload } from 'src/app/DTOs/app.controller';
import { AccountService } from 'src/app/services/account.service';

@Controller()
export class AppController {
  constructor(private accountService: AccountService) {}

  @Post('login')
  async login(@Body() body: LoginPayload) {
    await this.accountService.inti(body.phoneNumber);

    return { isOk: true };
  }

  @Post('send-message')
  async sendMessage(@Body() body: SendMessagePayload) {
    await this.accountService.sendMessage(body);

    return true;
  }
}
