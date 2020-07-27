import {DefaultCrudRepository} from '@loopback/repository';
import {Region, RegionRelations} from '../models';
import {LbCrudDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class RegionRepository extends DefaultCrudRepository<
  Region,
  typeof Region.prototype.id,
  RegionRelations
> {
  constructor(
    @inject('datasources.lb_crud') dataSource: LbCrudDataSource,
  ) {
    super(Region, dataSource);
  }
}
