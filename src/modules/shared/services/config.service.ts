import { Injectable } from '@nestjs/common';
import { ConfigService as NestConfigService } from '@nestjs/config';

@Injectable()
export class ConfigService {
  constructor(private nestConfigService: NestConfigService) {}

  getEnvironmentParams(): Record<string, any> {
    const environmentParams = {};
    const envKeys = Object.keys(process.env);

    for (const key of envKeys) {
      environmentParams[key] = this.nestConfigService.get(key);
    }

    return environmentParams;
  }

  getSwaggerPath(): string {
    return this.nestConfigService.get('SWAGGER_PATH');
  }

  getDbConfig() {
    return {
      host: this.nestConfigService.get('DB_HOST'),
      port: this.nestConfigService.get<number>('DB_PORT'),
      username: this.nestConfigService.get('DB_USERNAME'),
      password: this.nestConfigService.get('DB_PASSWORD'),
      database: this.nestConfigService.get('DB_DATABASE'),
    };
  }
}
