import { if_not_null, throw_if_null } from '@COMMON/util';

describe('Util Function Unit Test', () => {
  const identity = <T>(value: T) => value;
  describe('if_not_null', () => {
    it('if data is null', () => {
      const received = if_not_null(null, identity);

      expect(received).toBeNull();
    });

    it('if data is not null', () => {
      const received = if_not_null(123, identity);

      expect(received).toBe(123);
    });
  });

  describe('throw_if_null', () => {
    it('if data is null', () => {
      expect(() => throw_if_null(null, Error('hello'))).toThrowError('hello');
    });
    it('if data is not null', () => {
      const received = throw_if_null('hi', Error('hello'));
      expect(received).toBe('hi');
    });
  });
});
