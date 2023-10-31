import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import envConfig from './common/config/env.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const env = envConfig();
  const config = new DocumentBuilder()
    .setTitle(`${env.metaData.systemName + env.metaData.serviceName} API`)
    .setDescription(env.metaData.description)
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(env.port);
  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
