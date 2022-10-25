import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { InfrastructureModule } from 'src/infrastructure/infrastructure.module';

describe('User API e2e test', () => {
  let app: INestApplication;
  let req: request.SuperTest<request.Test>;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
    req = request(app.getHttpServer());
  });

  afterAll((done) => {
    app
      .get(InfrastructureModule)
      .dataSource.dropDatabase() // test database 초기화
      .then(() => app.close())
      .then(() => done());
  });
  // const bodys: CreateUserBody[] = [];

  describe('POST /user', () => {
    it.each([])('잘못된 사용자 생성 요청', async () => {
      return;
    });

    it.each([])('올바른 사용자 생성 요청', async () => {
      return;
    });
  });

  describe('GET /user/:user_id', () => {
    it('없는 사용자 조회', async () => {
      return;
    });

    it('잘못된 param 전달', async () => {
      return;
    });

    it.each([])('존재하는 사용자 조회', async () => {
      return;
    });
  });

  describe('DELETE /user/:user_id', () => {
    it('존재하지 않는 사용자 제거 요청', async () => {
      return;
    });
    it('존재하는 사용자 제거 요청', async () => {
      return;
    });
  });
});
