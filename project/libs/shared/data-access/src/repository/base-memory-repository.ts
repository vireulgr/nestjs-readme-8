import { Entity, EntityFactory, StorableEntity } from '@project/core';
import { Repository } from './repository.interface';
import { randomUUID } from 'node:crypto';

export class BaseMemoryRepository<T extends Entity & StorableEntity<ReturnType<T['toPOJO']>>> implements Repository<T> {
  protected data: Map<T['id'], ReturnType<T['toPOJO']>> = new Map();

  constructor(
    protected entityFactory: EntityFactory<T>
  )
  {}

  public async findById(id: T['id']): Promise<T | null> {
    const found = this.data.get(id);
    if (!found) {
      return null;
    }

    return this.entityFactory.create(found);
  }

  public async save(entity: T): Promise<void> {
    if (!entity.id) {
      entity.id = randomUUID();
    }

    this.data.set(entity.id, entity.toPOJO());
  }

  public async update(entity: T): Promise<void> {
    if (!this.data.has(entity.id)) {
      throw new Error('no id! cannot update entity!');
    }

    this.data.set(entity.id, entity.toPOJO());
  }

  public async deleteById(id: T['id']): Promise<void> {
    if (!this.data.has(id)) {
      throw new Error('no id! cannot delete entity!');
    }

    this.data.delete(id);
  }
}
