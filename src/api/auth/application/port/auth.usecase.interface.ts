import { AuthUsecaseDTO } from '../dto/auth.usecase.dto';

export interface IAuthUsecase {
  signIn: (dto: AuthUsecaseDTO.SignIn) => AuthUsecaseDTO.SignInResponse;
}
