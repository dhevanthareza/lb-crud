import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {SalesArea, SalesAreaRelations, Region} from '../models';
import {LbCrudDataSource} from '../datasources';
import {inject, Getter} from '@loopback/core';
import {RegionRepository} from './region.repository';

export class SalesAreaRepository extends DefaultCrudRepository<
  SalesArea,
  typeof SalesArea.prototype.id,
  SalesAreaRelations
> {

  public readonly Region: BelongsToAccessor<Region, typeof SalesArea.prototype.id>;

  constructor(
    @inject('datasources.lb_crud') dataSource: LbCrudDataSource, @repository.getter('RegionRepository') protected regionRepositoryGetter: Getter<RegionRepository>,
  ) {
    super(SalesArea, dataSource);
    this.Region = this.createBelongsToAccessorFor('Region', regionRepositoryGetter,);
    this.registerInclusionResolver('Region', this.Region.inclusionResolver);
  }
}
