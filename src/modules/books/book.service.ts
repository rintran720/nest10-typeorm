import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Book } from './book.entity';
import { CreateBookDto, UpdateBookDto } from './dto/book.dto';

@Injectable()
export class BookService {
  constructor(
    @InjectRepository(Book)
    private bookRepository: Repository<Book>,
  ) {}

  async create(book: CreateBookDto): Promise<Book> {
    return this.bookRepository.save(book);
  }

  async findAll(): Promise<Book[]> {
    return this.bookRepository.find();
  }

  async findOne(id: string): Promise<Book> {
    return this.bookRepository.findOne({ where: { id } });
  }

  async update(id: string, book: UpdateBookDto): Promise<Book> {
    await this.bookRepository.update(id, book);
    return this.bookRepository.findOne({ where: { id } });
  }

  async remove(id: string): Promise<void> {
    await this.bookRepository.delete(id);
  }
}
