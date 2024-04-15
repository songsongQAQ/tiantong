import { PARAMS } from '~/lib/common/const.ts'

export const Body = (property?: string) => {
  return (target: any, propertyKey: string, parameterIndex: number) => {
    const paramsTypes = Reflect.getMetadata(PARAMS, target, propertyKey) || []
    paramsTypes[parameterIndex] = {
      index: parameterIndex,
      property,
      type: 'body',
    }
    Reflect.defineMetadata(PARAMS, paramsTypes, target, propertyKey)
  }
}
export const Param = (property?: string) => {
  return (target: any, propertyKey: string, parameterIndex: number) => {
    const paramsTypes = Reflect.getMetadata(PARAMS, target, propertyKey) || []
    paramsTypes[parameterIndex] = {
      index: parameterIndex,
      property,
      type: 'param',
    }
    Reflect.defineMetadata(PARAMS, paramsTypes, target, propertyKey)
  }
}
