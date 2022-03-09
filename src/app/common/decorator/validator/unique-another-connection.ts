import { ValidatorConstraint } from 'class-validator';
import { Injectable } from '@nestjs/common';
import { InjectConnection } from '@nestjs/typeorm';
import { Connection } from 'typeorm';
import { UniqueValidator } from './abstract-unique-validator';

@ValidatorConstraint({ name: 'unique', async: true })
@Injectable()
export class UniqueAnotherConnection extends UniqueValidator {
  constructor(
    @InjectConnection('another-connection')
    protected readonly connection: Connection,
  ) {
    super(connection);
  }
}
