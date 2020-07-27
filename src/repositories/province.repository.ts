import {DefaultCrudRepository} from '@loopback/repository';
import {Province, ProvinceRelations} from '../models';
import {LbCrudDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class ProvinceRepository extends DefaultCrudRepository<
  Province,
  typeof Province.prototype.id,
  ProvinceRelations
> {
  constructor(
    @inject('datasources.lb_crud') dataSource: LbCrudDataSource,
  ) {
    super(Province, dataSource);
  }
}
