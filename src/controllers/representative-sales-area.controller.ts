import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Representative,
  SalesArea,
} from '../models';
import {RepresentativeRepository} from '../repositories';

export class RepresentativeSalesAreaController {
  constructor(
    @repository(RepresentativeRepository)
    public representativeRepository: RepresentativeRepository,
  ) { }

  @get('/representatives/{id}/sales-area', {
    responses: {
      '200': {
        description: 'SalesArea belonging to Representative',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(SalesArea)},
          },
        },
      },
    },
  })
  async getSalesArea(
    @param.path.number('id') id: typeof Representative.prototype.id,
  ): Promise<SalesArea> {
    return this.representativeRepository.SalesArea(id);
  }
}
