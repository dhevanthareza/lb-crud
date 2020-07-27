import {Entity, model, property, belongsTo} from '@loopback/repository';
import {Region} from './region.model';

@model()
export class SalesArea extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'string',
    required: true,
  })
  name: string;

  @belongsTo(() => Region)
  RegionId: number;

  constructor(data?: Partial<SalesArea>) {
    super(data);
  }
}

export interface SalesAreaRelations {
  // describe navigational properties here
}

export type SalesAreaWithRelations = SalesArea & SalesAreaRelations;
