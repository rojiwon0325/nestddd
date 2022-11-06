import { Crypto } from '@CRYPTO/domain';
import * as bcrypt from 'bcrypt';
jest.mock('bcrypt');
const { encrypt, compare } = Crypto;

describe('Crypto Domain Unit Test', () => {
  it('Crypto.enrypt', async () => {
    (bcrypt as any).hash = jest.fn().mockResolvedValue('abcd1234');
    const spyHash = jest.spyOn(bcrypt, 'hash');

    const result = await encrypt('12345');

    expect(result).toBe('abcd1234');
    expect(spyHash).toBeCalledTimes(1);
    expect(spyHash).toBeCalledWith('12345', 10);
  });
  it('Crypot.compare', async () => {
    (bcrypt as any).compare = jest.fn().mockResolvedValue(true);
    const spyCompare = jest.spyOn(bcrypt, 'compare');

    const result = await compare('12345', 'abcd1234');

    expect(result).toBe(true);
    expect(spyCompare).toBeCalledTimes(1);
    expect(spyCompare).toBeCalledWith('12345', 'abcd1234');
  });
});
