import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
} from '@loopback/rest';
import {Representative} from '../models';
import {RepresentativeRepository} from '../repositories';

export class RepresentativeController {
  constructor(
    @repository(RepresentativeRepository)
    public representativeRepository : RepresentativeRepository,
  ) {}

  @post('/representatives', {
    responses: {
      '200': {
        description: 'Representative model instance',
        content: {'application/json': {schema: getModelSchemaRef(Representative)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Representative, {
            title: 'NewRepresentative',
            exclude: ['id'],
          }),
        },
      },
    })
    representative: Omit<Representative, 'id'>,
  ): Promise<Representative> {
    return this.representativeRepository.create(representative);
  }

  @get('/representatives/count', {
    responses: {
      '200': {
        description: 'Representative model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.where(Representative) where?: Where<Representative>,
  ): Promise<Count> {
    return this.representativeRepository.count(where);
  }

  @get('/representatives', {
    responses: {
      '200': {
        description: 'Array of Representative model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(Representative, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(
    @param.filter(Representative) filter?: Filter<Representative>,
  ): Promise<Representative[]> {
    return this.representativeRepository.find(filter);
  }

  @patch('/representatives', {
    responses: {
      '200': {
        description: 'Representative PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Representative, {partial: true}),
        },
      },
    })
    representative: Representative,
    @param.where(Representative) where?: Where<Representative>,
  ): Promise<Count> {
    return this.representativeRepository.updateAll(representative, where);
  }

  @get('/representatives/{id}', {
    responses: {
      '200': {
        description: 'Representative model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Representative, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Representative, {exclude: 'where'}) filter?: FilterExcludingWhere<Representative>
  ): Promise<Representative> {
    return this.representativeRepository.findById(id, filter);
  }

  @patch('/representatives/{id}', {
    responses: {
      '204': {
        description: 'Representative PATCH success',
      },
    },
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Representative, {partial: true}),
        },
      },
    })
    representative: Representative,
  ): Promise<void> {
    await this.representativeRepository.updateById(id, representative);
  }

  @put('/representatives/{id}', {
    responses: {
      '204': {
        description: 'Representative PUT success',
      },
    },
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() representative: Representative,
  ): Promise<void> {
    await this.representativeRepository.replaceById(id, representative);
  }

  @del('/representatives/{id}', {
    responses: {
      '204': {
        description: 'Representative DELETE success',
      },
    },
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.representativeRepository.deleteById(id);
  }
}
