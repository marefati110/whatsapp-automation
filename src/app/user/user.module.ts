import { Module } from '@nestjs/common';
// controller
import { UserController } from './controllers/user.controller';
// service
import { UserService } from './services/user.service';

@Module({
  imports: [],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
