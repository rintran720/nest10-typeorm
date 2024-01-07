import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export function setupSwagger(
  app: INestApplication,
  swaggerPath: string,
  apiVersion: string,
  tag?: string,
): void {
  const options = new DocumentBuilder()
    .setTitle('API Documentation')
    .setVersion(apiVersion)
    .addTag(tag)
    .addSecurity('client', {
      type: 'http',
      scheme: 'bearer',
      description: 'Client - website.com',
    })
    .addSecurity('admin', {
      type: 'http',
      scheme: 'bearer',
      description: 'Admin - website.com',
    })
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup(swaggerPath, app, document);
}
