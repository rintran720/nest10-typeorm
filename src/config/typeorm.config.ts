// import { ConfigModule, ConfigService } from '@nestjs/config';
// import {
//   TypeOrmModuleAsyncOptions,
//   TypeOrmModuleOptions,
// } from '@nestjs/typeorm';
import { Book } from '../modules/books/book.entity';
import { DataSourceOptions } from 'typeorm';

// export const typeOrmAsyncConfig: TypeOrmModuleAsyncOptions = {
//   imports: [ConfigModule],
//   inject: [ConfigService],
//   // name: 'default', //this is the name of the connection
//   useFactory: async (
//     configService: ConfigService,
//   ): Promise<TypeOrmModuleOptions> => {
//     return {
//       type: 'mysql',
//       host: configService.get('DB_HOST'),
//       port: configService.get<number>('DB_PORT'),
//       username: configService.get('DB_USERNAME'),
//       database: configService.get('DB_DATABASE'),
//       password: configService.get('DB_PASSWORD'),
//       entities: [Book],
//       // migrations: [__dirname + '/../database/migrations/*{.ts,.js}'],
//       extra: {
//         charset: 'utf8mb4_unicode_ci',
//       },
//       synchronize: false,
//       logging: true,
//     };
//   },
// };

export const typeOrmConfig: DataSourceOptions = {
  type: 'mysql',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT, 10),
  username: process.env.DB_USERNAME,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  entities: [Book],
  migrations: [__dirname + '/../database/migrations/*{.ts,.js}'],
  extra: {
    charset: 'utf8mb4_unicode_ci',
  },
  synchronize: false,
  logging: true,
};
