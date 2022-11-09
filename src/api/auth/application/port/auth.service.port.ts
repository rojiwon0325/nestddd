import { Auth } from '@AUTH/domain';

export namespace IAuthService {
  export type FindOne = Pick<Auth.State, 'id'> | Pick<Auth.State, 'email'>;
  export type CheckPermission = Auth.CheckPermission;
  export type CheckPassword = Auth.CheckPassword;
  export type CheckDuplicate = Pick<Auth.State, 'email'>;
  export type CheckVerified = Pick<Auth.State, 'verified'>;
}

export interface IAuthService {
  readonly findOne: (where: IAuthService.FindOne) => Promise<Auth.State>;
  readonly checkPermission: (args: IAuthService.CheckPermission) => void;
  readonly checkPassword: (args: IAuthService.CheckPassword) => Promise<void>;
  readonly checkDuplicate: (args: IAuthService.CheckDuplicate) => Promise<void>;
  readonly checkVerified: (args: IAuthService.CheckVerified) => void;
}
