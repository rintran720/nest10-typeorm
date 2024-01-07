import { AppModule } from './app.module';
import { MyNestApplication } from './config/app';

async function bootstrap() {
  const myApp = new MyNestApplication(AppModule);
  await myApp.setup();

  const {
    SWAGGER_PATH = 'api-docs',
    SWAGGER_VERSION = '2023-12-25',
    PORT = 3000,
  } = process.env;

  await myApp.useSwagger(SWAGGER_PATH, SWAGGER_VERSION);

  await myApp.listen(Number(PORT));
}
bootstrap();
