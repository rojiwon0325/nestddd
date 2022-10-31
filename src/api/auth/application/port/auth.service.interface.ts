import { IAuth } from '../../domain/auth.interface';
import { FindOneAuthDTO, ValidateAuthDTO } from '../dto/auth.application.dto';

export interface IAuthService {
  findOne: (dto: FindOneAuthDTO) => Promise<IAuth>;
  validate: (dto: ValidateAuthDTO) => Promise<IAuth>;
}
