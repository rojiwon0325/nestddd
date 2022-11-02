import { UserDomain } from '@USER/domain/user.interface';
import { UserServiceDTO } from '../dto/user.service.dto';

export interface IUserService {
  checkDuplicate: (username: string) => Promise<void>;
  encrypt: (password: string) => Promise<string>;
  findOne: (dto: UserServiceDTO.FindOne) => Promise<UserDomain.Aggregate>;
}
