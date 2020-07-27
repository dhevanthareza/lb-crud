import {Getter, inject} from '@loopback/core';
import {
  BelongsToAccessor,
  DefaultCrudRepository,
  repository,
} from '@loopback/repository';
import {LbCrudDataSource} from '../datasources';
import {Role, UserRelations} from '../models';
import {User} from './../models/user.model';
import {RoleRepository} from './role.repository';

export class UserRepository extends DefaultCrudRepository<
  User,
  typeof User.prototype.id,
  UserRelations
> {
  public readonly Role: BelongsToAccessor<Role, typeof User.prototype.id>;

  constructor(
    @inject('datasources.lb_crud') dataSource: LbCrudDataSource,
    @repository.getter('RoleRepository')
    protected roleRepositoryGetter: Getter<RoleRepository>,
  ) {
    super(User, dataSource);
    this.Role = this.createBelongsToAccessorFor('Role', roleRepositoryGetter);
    this.registerInclusionResolver('Role', this.Role.inclusionResolver);
  }
  public async cusFind(): Promise<User[]> {
    return this.find({
      include: [{relation: 'productStatus'}],
    });
  }
}
