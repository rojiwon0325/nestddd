import { Repository } from 'typeorm';

export const mockRepository = <T extends object>(): Pick<
  Record<keyof Repository<T>, jest.Mock>,
  'findOne'
> => ({
  findOne: jest.fn(),
});
