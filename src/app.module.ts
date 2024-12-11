import { Module } from '@nestjs/common';
// module
import { HandlerService } from 'src/app/services/handler.service';
import { AccountService } from 'src/app/services/account.service';
import { AppController } from 'src/app/controllers/app.controller';

@Module({
  imports: [],
  providers: [HandlerService, AccountService],
  controllers: [AppController],
})
export class AppModule {}
