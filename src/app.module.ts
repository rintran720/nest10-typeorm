import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { configFilePath } from './config/env.config';
import { SharedModule } from './modules/shared/shared.module';
import { MysqlDatabaseModule } from './modules/mysql-database/mysql-database.module';
import { BookModule } from './modules/books/book.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: configFilePath,
      isGlobal: true, // Make the configuration global
    }),
    SharedModule,
    MysqlDatabaseModule,
    BookModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
