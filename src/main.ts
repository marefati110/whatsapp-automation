import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import { AccountService } from 'src/app/services/account.service';

process.on('unhandledRejection', (error) => {
  console.error(error);
});

process.on('uncaughtException', (error) => {
  console.error(error);
});

const logger = new Logger('APP');

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const port = process.env.PORT ?? 3000;
  await app.listen(port);

  const accountService = app.get<AccountService>(AccountService);

  await accountService.bootstrap();

  logger.verbose(`server available on http://localhost:${port}`);
}
bootstrap();
