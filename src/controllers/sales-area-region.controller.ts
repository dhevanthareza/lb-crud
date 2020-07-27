import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  SalesArea,
  Region,
} from '../models';
import {SalesAreaRepository} from '../repositories';

export class SalesAreaRegionController {
  constructor(
    @repository(SalesAreaRepository)
    public salesAreaRepository: SalesAreaRepository,
  ) { }

  @get('/sales-areas/{id}/region', {
    responses: {
      '200': {
        description: 'Region belonging to SalesArea',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Region)},
          },
        },
      },
    },
  })
  async getRegion(
    @param.path.number('id') id: typeof SalesArea.prototype.id,
  ): Promise<Region> {
    return this.salesAreaRepository.Region(id);
  }
}
