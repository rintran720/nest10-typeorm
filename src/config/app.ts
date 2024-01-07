import {
  ClassSerializerInterceptor,
  HttpStatus,
  Logger,
  NestApplicationOptions,
  ValidationPipe,
} from '@nestjs/common';
import { NestFactory, Reflector } from '@nestjs/core';
import {
  ExpressAdapter,
  NestExpressApplication,
} from '@nestjs/platform-express';
import * as compression from 'compression';
import helmet from 'helmet';
// import * as morgan from 'morgan';

import { setupSwagger } from './use-swagger';
import { HttpExceptionFilter } from '../filters/exception.filter';
import { AppModule } from '../app.module';

export class MyNestApplication {
  public app?: NestExpressApplication;

  public logger = new Logger(MyNestApplication.name);

  constructor(private appModule: typeof AppModule) {}

  async setup(
    option: NestApplicationOptions = { cors: true },
  ): Promise<NestExpressApplication> {
    const app = await NestFactory.create<NestExpressApplication>(
      this.appModule,
      new ExpressAdapter(),
      option,
    );

    if (option.cors) {
      app.enableCors();
    }
    app.enable('trust proxy'); // only if you're behind a reverse proxy (Heroku, Bluemix, AWS ELB, Nginx, etc)

    app.use(helmet());
    app.use(compression());
    // app.use(morgan('combined'));

    const reflector = app.get(Reflector);
    app.useGlobalInterceptors(new ClassSerializerInterceptor(reflector));
    app.useGlobalFilters(new HttpExceptionFilter());
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
        transform: true,
        transformOptions: { enableImplicitConversion: true },
        // dismissDefaultMessages: true,
        forbidUnknownValues: true,
        // exceptionFactory: (errors) => new UnprocessableEntityException(errors),
      }),
    );

    this.app = app;

    return app;
  }

  async useSwagger(swaggerPath: string, apiVersion: string): Promise<void> {
    setupSwagger(this.app, swaggerPath, apiVersion);
  }

  async listen(port: number): Promise<void> {
    await this.app?.listen(port);

    this.logger.log(`SERVER RUNNING ON PORT ${port}`);
  }
}
