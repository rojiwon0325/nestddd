import { TypeOrmBaseEntity } from 'src/api/common/model/typeorm-entity.base';
import { Column, Entity } from 'typeorm';
import { IsString } from 'class-validator';

export const UserErrorMessage = {
  username: '사용지명은 문자열입니다.',
};

@Entity({ name: 'users' })
export class UserEntity extends TypeOrmBaseEntity {
  @Column()
  @IsString({ message: UserErrorMessage.username })
  username: string;
}
