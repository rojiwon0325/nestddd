import { query_typecast, type_cast } from '@COMMON/decorator/typed-query';
import { map } from '@COMMON/util';

describe('TypeQueryOptions Unit Test', () => {
  describe('type option test', () => {
    const fn = type_cast;
    it.each<string>(['true', 'True', '1'])('type is boolean (true)', (val) => {
      const result = fn(val, 'boolean');
      expect(result).toBe(true);
    });
    it.each<string>(['false', 'False', '0'])(
      'type is boolean (false)',
      (val) => {
        const result = fn(val, 'boolean');
        expect(result).toBe(false);
      },
    );
    it.each<string>([
      'falsy',
      'TRUE',
      '12',
      '-1',
      'string',
      'null',
      'undefined',
    ])('type is boolean, but value is not typecast', (val) => {
      const result = fn(val, 'boolean');
      expect(result).toBe(null);
    });
    it.each<string>(['0', '1', '12', '-1', '01', '0xF1'])(
      'type is number',
      (val) => {
        const result = fn(val, 'number');
        expect(typeof result).toBe('number');
      },
    );
    it.each<string>(['null', 'string'])(
      'type is number, but value is not typecast',
      (val) => {
        const result = fn(val, 'number');
        expect(result).toBe(null);
      },
    );
    it.each<string>([
      '0',
      '1',
      '12',
      '-1',
      '01',
      '0xF1',
      'string',
      'false',
      'False',
    ])('type is string', (val) => {
      const result = fn(val, 'string');
      expect(result).toBe(val);
    });
    it.each<string>([
      'a0df3494-844d-11ed-a1eb-0242ac120002',
      '354b925d-4307-4d09-b55d-40c7e68cbe3e',
      'b581db04-844d-11ed-a1eb-0242ac120002',
      '70d57fec-39d9-48e6-a5c7-94cb047c854d',
    ])('type is uuid', (val) => {
      const result = fn(val, 'uuid');
      expect(result).toBe(val);
    });
    it.each<string>([
      ' 354b925d-4307-4d09-b55d-40c7e68cbe3e ',
      '1 354b925d-4307-4d09-b55d-40c7e68cbe3e ',
      'a0df3494-844d-11ed-a1eb-0242ac12000-',
      '0',
      'uuid',
    ])('type is uuid, but value is not typecast', (val) => {
      const result = fn(val, 'uuid');
      expect(result).toBe(null);
    });
  });
  const fn = query_typecast;
  const identity = (val: unknown) => val;
  describe('nullable option test', () => {
    it.each(['TRUE', 'true', undefined])('nullable', (val) => {
      const result = fn('test_key', val, { nullable: true });
      expect(result).toBe(map(val, identity));
    });
    it('not nullable', () => {
      expect(() => fn('test_key', undefined)).toThrowError(
        "Value of the URL query 'test_key' is required.",
      );
    });
  });

  describe('multiple option test', () => {
    describe('multiple', () => {
      it('null', () => {
        const result = fn('test_key', undefined, {
          multiple: true,
          nullable: true,
        });
        expect(result).toBe(null);
      });
      it('multiple data', () => {
        const result = fn('test_key', ['1', '2'], { multiple: true });
        expect(result).toEqual(['1', '2']);
      });
      it('single data', () => {
        const result = fn('test_key', 'single', { multiple: true });
        expect(result).toEqual(['single']);
      });
    });

    it('not multiple', () => {
      expect(() => fn('test_key', ['1', '2'])).toThrowError(
        "Value of the URL query 'test_key' is not a single.",
      );
    });
  });
});
