import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {City, CityRelations, Province} from '../models';
import {LbCrudDataSource} from '../datasources';
import {inject, Getter} from '@loopback/core';
import {ProvinceRepository} from './province.repository';

export class CityRepository extends DefaultCrudRepository<
  City,
  typeof City.prototype.id,
  CityRelations
> {

  public readonly Province: BelongsToAccessor<Province, typeof City.prototype.id>;

  constructor(
    @inject('datasources.lb_crud') dataSource: LbCrudDataSource, @repository.getter('ProvinceRepository') protected provinceRepositoryGetter: Getter<ProvinceRepository>,
  ) {
    super(City, dataSource);
    this.Province = this.createBelongsToAccessorFor('Province', provinceRepositoryGetter,);
    this.registerInclusionResolver('Province', this.Province.inclusionResolver);
  }
}
