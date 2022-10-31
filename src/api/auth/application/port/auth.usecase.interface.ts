import { IAuthId } from '../../domain/auth.interface';
import { ISignInResponse } from '../dto/auth.application.dto';

export interface IAuthUsecase {
  signIn: (id: IAuthId) => ISignInResponse;
}
