import {DefaultCrudRepository} from '@loopback/repository';
import {Role, RoleRelations} from '../models';
import {LbCrudDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class RoleRepository extends DefaultCrudRepository<
  Role,
  typeof Role.prototype.id,
  RoleRelations
> {
  constructor(
    @inject('datasources.lb_crud') dataSource: LbCrudDataSource,
  ) {
    super(Role, dataSource);
  }
}
