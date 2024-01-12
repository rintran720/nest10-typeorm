import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Logger,
  BadRequestException,
} from '@nestjs/common';
import { BookService } from './book.service';
import { CreateBookDto, UpdateBookDto } from './dto/book.dto';

@Controller('books')
export class BookController {
  private readonly logger = new Logger(BookController.name);
  constructor(private readonly bookService: BookService) {}

  @Get()
  findAll() {
    return this.bookService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.bookService.findOne(id);
  }

  @Post()
  create(@Body() createBookDto: CreateBookDto) {
    return this.bookService.create(createBookDto);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateBookDto: UpdateBookDto) {
    try {
      const updated = await this.bookService.update(id, updateBookDto);
      return updated;
    } catch (error) {
      this.logger.error(error);
      throw new BadRequestException(error.message);
    }
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.bookService.remove(id);
  }
}
