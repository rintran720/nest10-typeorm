import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Book } from './book.entity';
import { BookService } from './book.service';
import { BookController } from './book.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([Book]), // default connection
    // TypeOrmModule.forFeature([Movie], 'movieConnection'),
  ],
  controllers: [BookController],
  providers: [
    BookService,
    // {
    //   provide: DynamicProvider,
    //   useFactory: (movieConnection: DataSource) => {
    //     return new DynamicProvider(movieConnection);
    //   },
    //   inject: [getDataSourceToken('movieConnection')],
    // },
  ],
})
export class BookModule {}
