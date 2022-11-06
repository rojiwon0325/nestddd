import { Account } from '@ACCOUNT/domain';
import { IEntityMapper } from '@COMMON/interface/mapper.interface';
import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IAccountRepository } from '../port/account.repository.port';
import { AccountEntity } from './account.entity';
import { AccountEntityMapper } from './account.mapper';

@Injectable()
export class AccountRepository implements IAccountRepository {
  constructor(
    @Inject(AccountEntityMapper)
    private readonly mapper: IEntityMapper<Account.Property, AccountEntity>,
    @InjectRepository(AccountEntity)
    private readonly repository: Repository<AccountEntity>,
  ) {}

  async save(agg: Account.Property): Promise<Account.Property> {
    return this.mapper.toAggregate(
      await this.repository.save(this.mapper.toRootEntity(agg)),
    );
  }

  async remove({ id }: Account.Property): Promise<void> {
    await this.repository.delete(id);
    return;
  }

  async findOne(
    where: IAccountRepository.FindOne,
  ): Promise<Account.Property | null> {
    const entity = await this.repository.findOne({ where });
    return entity == null ? null : this.mapper.toAggregate(entity);
  }
}
