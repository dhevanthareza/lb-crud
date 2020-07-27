import {Entity, model, property} from '@loopback/repository';

@model({settings: {strict: false}})
export class Region extends Entity {
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

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Region>) {
    super(data);
  }
}

export interface RegionRelations {
  // describe navigational properties here
}

export type RegionWithRelations = Region & RegionRelations;
