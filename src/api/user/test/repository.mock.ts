import { Repository } from 'typeorm';

export const mockRepository = <T extends object>(): Pick<
  Record<keyof Repository<T>, jest.Mock>,
  'findOne' | 'find' | 'save' | 'delete'
> => ({
  findOne: jest.fn(),
  find: jest.fn(),
  save: jest.fn(),
  delete: jest.fn(),
});
