import { Repository } from 'typeorm';

export const mockRepository = <T extends object>(): Pick<
  Record<keyof Repository<T>, jest.Mock>,
  'findOne' | 'save' | 'delete'
> => ({
  findOne: jest.fn(),
  save: jest.fn(),
  delete: jest.fn(),
});
