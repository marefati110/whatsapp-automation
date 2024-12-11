import { Body, Controller, Post } from '@nestjs/common';
// services
import { UserService } from '../services/user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  registerUser(@Body() body: { userId: string }) {
    return this.userService.initializeClient(body.userId);
  }
}
