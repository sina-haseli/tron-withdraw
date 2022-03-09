import { resolve } from 'path';

export const isTest = process.env.NODE_ENV === 'test';
export const dateRegex =
  /^\d{4}[-]\d{2}[-]\d{2}[T]\d{2}[:]\d{2}[:]\d{2}.\d{3}[Z]$/;
export const KAFKA_CLIENT_SERVICE = 'KAFKA_CLIENT_SERVICE';
export const bucket = process.env.MINIO_BUCKET || 'site-test';
export const tempPath = resolve('./temp');
