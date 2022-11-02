import { AuthDomain } from '@AUTH/domain/auth.interface';
import { AuthServiceDTO } from '../dto/auth.service.dto';

export interface IAuthService {
  findOne: (dto: AuthServiceDTO.FindOne) => Promise<AuthDomain.Aggregate>;
  validate: (dto: AuthServiceDTO.Validate) => Promise<AuthDomain.Aggregate>;
  checkPermission: (dto: AuthServiceDTO.CheckPermission) => boolean;
}
