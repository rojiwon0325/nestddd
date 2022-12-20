import { User } from '@USER/domain';
import { UserEntity } from '../model/user.entity';

export const entity_to_aggregate =
  (profile: User.Profile) => (entity: UserEntity) => {
    const { created_at, updated_at, role, id } = entity;
    const { email, username } = profile;
    return User.get({ id, email, username, role, created_at, updated_at });
  };

export const aggregate_to_entity = (state: User.State) => {
  const entity = new UserEntity();
  entity.id = state.id;
  entity.role = state.role;
  return entity;
};
