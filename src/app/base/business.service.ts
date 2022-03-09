import { BusinessRepository } from './business.repository';
import { isArray, map } from 'lodash';
import {
  ConflictException,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import {
  DeepPartial,
  DeleteResult,
  EntityTarget,
  getConnection,
  QueryRunner,
  Repository,
  SaveOptions,
  UpdateResult,
} from 'typeorm';
import { ObjectLiteral } from 'typeorm/common/ObjectLiteral';

export class BusinessService<Entity extends ObjectLiteral> {
  entityName: string;
  Record: any;
  constructor(private repository: BusinessRepository<any>) {
    this.Record = this.repository.target;
    this.entityName = this.repository.metadata.name.toLowerCase();
  }

  findAll(...relations: string[]) {
    return this.repository.find({
      relations,
    });
  }

  async findOne(id: number, ...relations: string[]): Promise<Entity> {
    const record = await this.repository.findOne(id, { relations });
    this.checkNotFound(record);
    return record;
  }

  findByIds(ids: number[], ...relations: string[]) {
    return this.repository.findByIds(ids, { relations });
  }

  async assertOrFail(id: number, ...fields: string[]): Promise<Entity> {
    if (!id) {
      return undefined;
    }
    const record = await this.repository.assertOrFail(id, ...fields);
    this.checkNotFound(record);
    return record;
  }

  async delete(id: number) {
    const result = await this.repository.softDelete(id);
    this.checkAffected(result);
  }

  async softDelete(
    repository: Repository<any>,
    id: number | number[],
  ): Promise<any> {
    if (!isArray(id)) {
      id = [id];
    }
    const entities = await repository.findByIds(id as number[]);
    const toBeDeleted = map(entities, (e) => ({
      ...e,
      deletedAt: new Date(),
    }));
    return repository.save(toBeDeleted);
  }

  async updateById(id: number, updateData: DeepPartial<Entity>) {
    const record = new this.Record();
    record.id = id;
    for (const [key, value] of Object.entries(updateData)) {
      if (value !== undefined) {
        record[key] = value;
      }
    }
    await this.assertOrFail(record.id);
    try {
      return this.repository.save(record);
    } catch (e) {
      if (e.code === '23505') {
        throw new ConflictException(e.message);
      } else {
        throw new InternalServerErrorException(e.message);
      }
    }
  }

  async save(
    entity: DeepPartial<Entity>,
    options: SaveOptions = {},
  ): Promise<Entity> {
    const record = new this.Record();
    for (const [key, value] of Object.entries(entity)) {
      if (value !== undefined) {
        record[key] = value;
      }
    }

    try {
      return this.repository.save(record, options);
    } catch (e) {
      if (e.code === '23505') {
        throw new ConflictException(e.message);
      } else {
        throw new InternalServerErrorException(e.message);
      }
    }
  }

  checkAffected(result: UpdateResult | DeleteResult) {
    if (!result.affected) {
      throw new NotFoundException(`${this.entityName} not found`);
    }
  }
  checkNotFound(entity: Entity) {
    if (!entity) {
      throw new NotFoundException(`${this.entityName} not found`);
    }
  }

  async deleteTransactional(
    targetOrEntity: EntityTarget<Entity>,
    id: number,
    queryRunner: QueryRunner,
  ) {
    const result = await queryRunner.manager.softDelete(targetOrEntity, id);
    this.checkAffected(result);
  }
  async saveTransactional(
    entity: DeepPartial<Entity>,
    queryRunner: QueryRunner,
    options: SaveOptions = {},
  ): Promise<Entity> {
    const record = new this.Record();
    for (const [key, value] of Object.entries(entity)) {
      if (value !== undefined) {
        record[key] = value;
      }
    }

    try {
      return await queryRunner.manager.save(record, options);
    } catch (e) {
      if (e.code === '23505') {
        throw new ConflictException(e.message);
      } else {
        throw new InternalServerErrorException(e.message);
      }
    }
  }

  async updateByIdTransactional(
    id: number,
    updateData: DeepPartial<Entity>,
    queryRunner: QueryRunner,
  ) {
    const record = new this.Record();
    record.id = id;
    for (const [key, value] of Object.entries(updateData)) {
      if (value !== undefined) {
        record[key] = value;
      }
    }
    await this.assertOrFail(record.id);
    try {
      return await queryRunner.manager.save(record);
    } catch (e) {
      if (e.code === '23505') {
        throw new ConflictException(e.message);
      } else {
        throw new InternalServerErrorException(e.message);
      }
    }
  }
  async initiateTransaction() {
    const connection = getConnection();
    const queryRunner = connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    return queryRunner;
  }
}
