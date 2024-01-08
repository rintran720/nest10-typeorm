import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { AppModule } from '../src/app.module';
import * as request from 'supertest';
import { Book } from '../src/modules/books/book.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { BookModule } from '../src/modules/books/book.module';
import { Repository } from 'typeorm';

describe('BookController (e2e)', () => {
  let app: INestApplication;
  let moduleFixture: TestingModule;
  beforeAll(async () => {
    moduleFixture = await Test.createTestingModule({
      imports: [AppModule, BookModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    // Create a new book in the database
    // bookRepository = moduleFixture.get(getRepositoryToken(Book));
  });

  afterAll(async () => {
    await app.close();
  });

  let bookRepository: Repository<Book>;
  let existingBook: Book;

  beforeEach(async () => {
    // Get the book repository
    bookRepository = moduleFixture.get(getRepositoryToken(Book));

    // Create a new book in the database
    existingBook = await bookRepository.save(
      bookRepository.create({ title: 'Test Book', author: 'John Tran 0' }),
    );
  });

  afterEach(async () => {
    // Remove the book from the database
    await bookRepository.remove(existingBook);
  });

  describe('/books', () => {
    it('GET /books should return an array of books', () => {
      console.log(existingBook);
      return request(app.getHttpServer())
        .get('/books')
        .expect(200)
        .expect((res) => {
          expect(res.body).toBeInstanceOf(Array);
          expect(res.body.length).toBeGreaterThan(0);
        });
    });

    it('POST /books should create a new book', () => {
      const newBook = {
        title: 'Test Book',
        author: 'John Doe',
      };

      return request(app.getHttpServer())
        .post('/books')
        .send(newBook)
        .expect(201)
        .expect((res) => {
          expect(res.body).toHaveProperty('id');
          expect(res.body.title).toEqual(newBook.title);
          expect(res.body.author).toEqual(newBook.author);
        });
    });
  });

  describe('/books/:id', () => {
    it('GET /books/:id should return a specific book', () => {
      const bookId = existingBook.id;
      console.log(bookId);

      return request(app.getHttpServer())
        .get(`/books/${bookId}`)
        .expect(200)
        .expect((res) => {
          expect(res.body).toHaveProperty('id');
          expect(res.body.id).toEqual(bookId);
        });
    });

    it('PUT /books/:id should update a specific book', () => {
      const bookId = existingBook.id;
      const updatedBook = {
        title: 'Updated Book',
        author: 'Jane Smith',
      };

      return request(app.getHttpServer())
        .put(`/books/${bookId}`)
        .send(updatedBook)
        .expect(200)
        .expect((res) => {
          expect(res.body).toHaveProperty('id');
          expect(res.body.title).toEqual(updatedBook.title);
          expect(res.body.author).toEqual(updatedBook.author);
        });
    });

    it('DELETE /books/:id should delete a specific book', () => {
      const bookId = existingBook.id;

      return request(app.getHttpServer())
        .delete(`/books/${bookId}`)
        .expect(200);
    });
  });
});
