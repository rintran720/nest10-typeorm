import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BookService } from './book.service';
import { Book } from './book.entity';
import { CreateBookDto, UpdateBookDto } from './dto/book.dto';
import { NotFoundException } from '@nestjs/common';

describe('BookService', () => {
  let bookService: BookService;
  let bookRepository: Repository<Book>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BookService,
        {
          provide: getRepositoryToken(Book),
          useClass: Repository,
        },
      ],
    }).compile();

    bookService = module.get<BookService>(BookService);
    bookRepository = module.get<Repository<Book>>(getRepositoryToken(Book));
  });

  describe('create', () => {
    it('should create a new book', async () => {
      const createBookDto: CreateBookDto = {
        title: 'Test Book',
        author: 'John Tran',
      };

      const savedBook: Book = {
        id: '1',
        title: 'Test Book',
        author: 'John Tran',
        created_at: new Date(),
        updated_at: new Date(),
      };

      jest.spyOn(bookRepository, 'save').mockResolvedValue(savedBook);

      const result = await bookService.create(createBookDto);

      expect(result).toEqual(savedBook);
      expect(bookRepository.save).toHaveBeenCalledWith(createBookDto);
    });
  });

  describe('findAll', () => {
    it('should return an array of books', async () => {
      const books: Book[] = [
        {
          id: '1',
          title: 'Book 1',
          author: 'Author 1',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: '2',
          title: 'Book 2',
          author: 'Author 2',
          created_at: new Date(),
          updated_at: new Date(),
        },
      ];

      jest.spyOn(bookRepository, 'find').mockResolvedValue(books);

      const result = await bookService.findAll();

      expect(result).toEqual(books);
      expect(bookRepository.find).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return a book by id', async () => {
      const bookId = '1';
      const book: Book = {
        id: bookId,
        title: 'Book 1',
        author: 'Author 1',
        created_at: new Date(),
        updated_at: new Date(),
      };

      jest.spyOn(bookRepository, 'findOne').mockResolvedValue(book);

      const result = await bookService.findOne(bookId);

      expect(result).toEqual(book);
      expect(bookRepository.findOne).toHaveBeenCalledWith({
        where: { id: bookId },
      });
    });
  });

  describe('update', () => {
    it('should update a book by id', async () => {
      const bookId = '1';
      const updateBookDto: UpdateBookDto = {
        title: 'Updated Book',
        author: 'John Tran',
      };

      const existingBook: Book = {
        id: bookId,
        title: 'Test Book',
        author: 'John Tran',
        created_at: new Date(),
        updated_at: new Date(),
      };

      const updatedBook: Book = {
        id: bookId,
        title: 'Updated Book',
        author: 'John Tran',
        created_at: existingBook.created_at,
        updated_at: new Date(),
      };

      jest.spyOn(bookRepository, 'findOne').mockResolvedValue(existingBook);
      jest.spyOn(bookRepository, 'save').mockResolvedValue(updatedBook);

      const result = await bookService.update(bookId, updateBookDto);

      expect(result).toEqual(updatedBook);
      expect(bookRepository.findOne).toHaveBeenCalledWith({
        where: { id: bookId },
      });
      expect(bookRepository.save).toHaveBeenCalledWith({
        ...existingBook,
        ...updateBookDto,
        updated_at: expect.any(Date),
      });
    });

    it('should throw NotFoundException if book is not found', async () => {
      const bookId = '1';
      const updateBookDto: UpdateBookDto = {
        title: 'Updated Book',
        author: 'John Tran',
      };
      const updatedBook: Book = {
        id: bookId,
        title: 'Updated Book',
        author: 'John Tran',
        created_at: new Date(),
        updated_at: new Date(),
      };

      jest.spyOn(bookRepository, 'findOne').mockResolvedValue(undefined);
      jest.spyOn(bookRepository, 'save').mockResolvedValue(updatedBook);

      await expect(bookService.update(bookId, updateBookDto)).rejects.toThrow(
        NotFoundException,
      );
      expect(bookRepository.findOne).toHaveBeenCalledWith({
        where: { id: bookId },
      });
      expect(bookRepository.save).not.toHaveBeenCalled();
    });
  });

  describe('remove', () => {
    it('should remove a book by id', async () => {
      const bookId = '1';

      jest.spyOn(bookRepository, 'delete').mockResolvedValue(undefined);

      await bookService.remove(bookId);

      expect(bookRepository.delete).toHaveBeenCalledWith(bookId);
    });
  });
});
