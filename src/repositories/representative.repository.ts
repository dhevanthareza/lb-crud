import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {Representative, RepresentativeRelations, SalesArea} from '../models';
import {LbCrudDataSource} from '../datasources';
import {inject, Getter} from '@loopback/core';
import {SalesAreaRepository} from './sales-area.repository';

export class RepresentativeRepository extends DefaultCrudRepository<
  Representative,
  typeof Representative.prototype.id,
  RepresentativeRelations
> {

  public readonly SalesArea: BelongsToAccessor<SalesArea, typeof Representative.prototype.id>;

  constructor(
    @inject('datasources.lb_crud') dataSource: LbCrudDataSource, @repository.getter('SalesAreaRepository') protected salesAreaRepositoryGetter: Getter<SalesAreaRepository>,
  ) {
    super(Representative, dataSource);
    this.SalesArea = this.createBelongsToAccessorFor('SalesArea', salesAreaRepositoryGetter,);
    this.registerInclusionResolver('SalesArea', this.SalesArea.inclusionResolver);
  }
}
