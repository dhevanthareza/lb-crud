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
import {SalesArea} from '../models';
import {SalesAreaRepository} from '../repositories';

export class SalesAreaController {
  constructor(
    @repository(SalesAreaRepository)
    public salesAreaRepository : SalesAreaRepository,
  ) {}

  @post('/sales-areas', {
    responses: {
      '200': {
        description: 'SalesArea model instance',
        content: {'application/json': {schema: getModelSchemaRef(SalesArea)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(SalesArea, {
            title: 'NewSalesArea',
            exclude: ['id'],
          }),
        },
      },
    })
    salesArea: Omit<SalesArea, 'id'>,
  ): Promise<SalesArea> {
    return this.salesAreaRepository.create(salesArea);
  }

  @get('/sales-areas/count', {
    responses: {
      '200': {
        description: 'SalesArea model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.where(SalesArea) where?: Where<SalesArea>,
  ): Promise<Count> {
    return this.salesAreaRepository.count(where);
  }

  @get('/sales-areas', {
    responses: {
      '200': {
        description: 'Array of SalesArea model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(SalesArea, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(
    @param.filter(SalesArea) filter?: Filter<SalesArea>,
  ): Promise<SalesArea[]> {
    return this.salesAreaRepository.find(filter);
  }

  @patch('/sales-areas', {
    responses: {
      '200': {
        description: 'SalesArea PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(SalesArea, {partial: true}),
        },
      },
    })
    salesArea: SalesArea,
    @param.where(SalesArea) where?: Where<SalesArea>,
  ): Promise<Count> {
    return this.salesAreaRepository.updateAll(salesArea, where);
  }

  @get('/sales-areas/{id}', {
    responses: {
      '200': {
        description: 'SalesArea model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(SalesArea, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(SalesArea, {exclude: 'where'}) filter?: FilterExcludingWhere<SalesArea>
  ): Promise<SalesArea> {
    return this.salesAreaRepository.findById(id, filter);
  }

  @patch('/sales-areas/{id}', {
    responses: {
      '204': {
        description: 'SalesArea PATCH success',
      },
    },
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(SalesArea, {partial: true}),
        },
      },
    })
    salesArea: SalesArea,
  ): Promise<void> {
    await this.salesAreaRepository.updateById(id, salesArea);
  }

  @put('/sales-areas/{id}', {
    responses: {
      '204': {
        description: 'SalesArea PUT success',
      },
    },
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() salesArea: SalesArea,
  ): Promise<void> {
    await this.salesAreaRepository.replaceById(id, salesArea);
  }

  @del('/sales-areas/{id}', {
    responses: {
      '204': {
        description: 'SalesArea DELETE success',
      },
    },
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.salesAreaRepository.deleteById(id);
  }
}
