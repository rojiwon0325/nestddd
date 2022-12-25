import { IUserAggregate } from '@INTERFACE/user/domain';
import { UserAggregate } from '@USER/domain';
import { UserEntity } from './user.entity';

export const entity_to_aggregate =
  (profile: IUserAggregate.Profile) => (entity: UserEntity) => {
    const { created_at, updated_at, role, id } = entity;
    const { email, username } = profile;
    return UserAggregate.get({
      id,
      email,
      username,
      role,
      created_at,
      updated_at,
    });
  };

export const aggregate_to_entity = (state: IUserAggregate.State) => {
  const entity = new UserEntity();
  entity.id = state.id;
  entity.role = state.role;
  return entity;
};
