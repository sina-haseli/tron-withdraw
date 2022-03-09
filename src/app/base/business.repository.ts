import { DeleteResult, FindConditions, ObjectID, Repository } from 'typeorm';
import { ObjectLiteral } from 'typeorm/common/ObjectLiteral';

export class BusinessRepository<Entity extends ObjectLiteral> extends Repository<Entity> {
  async delete(
    criteria: string | string[] | number | number[] | Date | Date[] | ObjectID | ObjectID[] | FindConditions<Entity>,
  ): Promise<DeleteResult> {
    const result = await this.softDelete(criteria);
    return {
      affected: result.affected,
      raw: result.raw,
    };
  }

  async assertOrFail(id: number, ...fields: string[]): Promise<Entity> {
    return this.findOne(id, {
      select: ['id', ...fields],
    });
  }
}
