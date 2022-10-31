import { TypeOrmBaseEntity } from 'src/api/common/base/base-entity.typeorm';
import { Column, Entity } from 'typeorm';
import { IsEnum, IsString } from 'class-validator';
import { UserRole } from 'src/api/user/domain/user.enum';

export const UserErrorMessage = {
  username: '잘못된 사용자명입니다.',
  username_unique: '이미 존재하는 사용자명입니다.',
  password: '잘못된 비밀번호입니다.',
  password_regex: '비밀번호는 숫자와 문자로 이루어진 6~12자리입니다.',
  role: '잘못된 사용자 권한입니다.',
};

@Entity({ name: 'users' })
export class UserEntity extends TypeOrmBaseEntity {
  @Column({ unique: true })
  @IsString({ message: UserErrorMessage.username })
  username: string;

  @Column()
  @IsString({ message: UserErrorMessage.password })
  password: string;

  @Column({ default: UserRole.Normal })
  @IsEnum(UserRole, { message: UserErrorMessage.role })
  role: UserRole;
}
