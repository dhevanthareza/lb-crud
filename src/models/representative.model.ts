import {Entity, model, property, belongsTo} from '@loopback/repository';
import {SalesArea} from './sales-area.model';

@model()
export class Representative extends Entity {
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

  @belongsTo(() => SalesArea)
  SalesAreaId: number;

  constructor(data?: Partial<Representative>) {
    super(data);
  }
}

export interface RepresentativeRelations {
  // describe navigational properties here
}

export type RepresentativeWithRelations = Representative & RepresentativeRelations;
