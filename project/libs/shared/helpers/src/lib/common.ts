import { ClassTransformOptions, plainToInstance } from 'class-transformer';


type PlainObject = Record<string, unknown>;

export function fillDto<T, V extends PlainObject>(
  DtoClass: new () => T,
  plainObject: V,
  options?: ClassTransformOptions): T;

export function fillDto<T, V extends PlainObject[]>(
  DtoClass: new () => T,
  plainObject: V,
  options?: ClassTransformOptions): T[];

export function fillDto<T, V extends PlainObject[]>(
  DtoClass: new () => T,
  plainObject: V,
  options?: ClassTransformOptions
): T | T[] {
  const additionalOptions = {
    excludeExtraneusValues: true,
    ...options
  };
  return plainToInstance(DtoClass, plainObject, additionalOptions);
}
