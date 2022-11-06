export const mockRepository = () => ({
  findOne: jest.fn(),
  save: jest.fn(),
  delete: jest.fn(),
});
