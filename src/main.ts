import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { setupSwagger } from './config/swagger.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  setupSwagger(app);

  await app.listen(4000);
  console.log('\n🚀 Swagger disponível em: http://localhost:4000/api');
  console.log('🚀 Servidor disponível em: http://localhost:4000');
}

bootstrap();