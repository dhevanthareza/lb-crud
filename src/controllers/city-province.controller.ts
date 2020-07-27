import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  City,
  Province,
} from '../models';
import {CityRepository} from '../repositories';

export class CityProvinceController {
  constructor(
    @repository(CityRepository)
    public cityRepository: CityRepository,
  ) { }

  @get('/cities/{id}/province', {
    responses: {
      '200': {
        description: 'Province belonging to City',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Province)},
          },
        },
      },
    },
  })
  async getProvince(
    @param.path.number('id') id: typeof City.prototype.id,
  ): Promise<Province> {
    return this.cityRepository.Province(id);
  }
}
