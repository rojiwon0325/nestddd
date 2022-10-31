import { IUser } from '../../domain/user.interface';
import { FindOneUserDTO } from '../dto/user.application.dto';

export interface IUserService {
  checkDuplicate: (username: string) => Promise<void>;
  encrypt: (password: string) => Promise<string>;
  findOne: (dto: FindOneUserDTO) => Promise<IUser>;
}
