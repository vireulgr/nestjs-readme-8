import { Document, Model } from 'mongoose';
import { NotFoundException } from '@nestjs/common';
import { Entity, EntityFactory, StorableEntity } from '@project/core';
import { Repository } from './repository.interface';

export abstract class BaseMongoRepository<
  T extends Entity & StorableEntity<ReturnType<T['toPOJO']>>,
  DocumentType extends Document
> implements Repository<T> {

  constructor(
    protected entityFactory: EntityFactory<T>,
    protected readonly model: Model<DocumentType>,
  ) {}

  protected createEntityFromDocument(aDocument: DocumentType): T | null {
    if (!aDocument) {
      return null;
    }

    const plainObject = aDocument.toObject({versionKey: false}) as ReturnType<T['toPOJO']>;
    return this.entityFactory.create(plainObject);
  }

  public async findById(id: T['id']): Promise<T> {
    const aDocument = await this.model.findById(id).exec();
    return this.createEntityFromDocument(aDocument);
  }

  public async save(entity: T): Promise<void> {
    const newEntity = new this.model(entity.toPOJO());
    await newEntity.save();

    entity.id = newEntity._id.toString();
  }

  public async update(entity: T): Promise<void> {
    const updatedDocument = await this.model.findByIdAndUpdate(
      entity.id,
      entity.toPOJO(),
      { new: true, runValidators: true }) // валидаторы - не обязательно. new - чтобы получить обновлённый документ в updateDocument
      .exec();

    if (!updatedDocument) {
      throw new NotFoundException(`User with id ${entity.id} not found`);
    }
  }

  public async deleteById(id: T['id']): Promise<void> {
    const deletedDocument = await this.model.findByIdAndDelete(id).exec();

    if (!deletedDocument) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
  }
}
