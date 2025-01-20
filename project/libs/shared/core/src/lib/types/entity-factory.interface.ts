import { StorableEntity } from './storable-entity.interface';


export interface EntityFactory<T extends StorableEntity<ReturnType<T['toPOJO']>>> {
  create(simpleData: ReturnType<T['toPOJO']>): T;
}
