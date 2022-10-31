export class TypeOrmMockRepository {
  findOne = jest.fn();
  find = jest.fn();
  save = jest.fn();
  remove = jest.fn();
}
