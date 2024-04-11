import { getMetadata, setMetadata } from './utils'
//路由元数据
export const ROUTE_METADATA_KEY = Symbol('route')
//参数元数据
export const PARAM_METADATA_KEY = Symbol('paramMetadata')

export type RouteHandler = (req: Request) => Response

export type IRoutes = Record<
  string,
  { handler: string; method: string; target: any }
>

export function Controller(prefix: string) {
  return function (target: any): any {
    return class extends target {
      constructor() {
        super()
        const mateRoutes = getMetadata(this.constructor, ROUTE_METADATA_KEY)
        const routes: IRoutes = {}
        Object.keys(mateRoutes).forEach((key) => {
          //类似 /user//替换为 /user
          key = key.replace(/\/+$/, '')
          routes[`${prefix ? '/' + prefix : ''}${key ? '/' + key : ''}`] =
            mateRoutes[key]
        })

        setMetadata(this.constructor, ROUTE_METADATA_KEY, routes)
      }
    }
  }
}
/**
 * 将指定的方法标记为与指定路径关联的路由处理函数
 *
 * @param path 路由路径
 * @returns 返回一个装饰器函数
 */
export function Get(path?: string) {
  return function (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor
  ) {
    // 获取该类上已有的路由信息，如果没有则初始化为空对象
    const routes = getMetadata(target.constructor, ROUTE_METADATA_KEY) || {}

    // 将当前方法与指定路径关联起来
    routes[path || ''] = {
      method: 'get',
      handler: descriptor.value,
      target: target,
    }
    // 将更新后的路由信息存储到类的元数据中
    setMetadata(target.constructor, ROUTE_METADATA_KEY, routes)
  }
}

export function Post(path: string) {
  return function (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor
  ) {
    // 获取该类上已有的路由信息，如果没有则初始化为空对象
    const routes = getMetadata(target.constructor, ROUTE_METADATA_KEY) || {}
    // 将当前方法与指定路径关联起来
    routes[path] = {
      method: 'post',
      handler: descriptor.value,
      target: target,
    }

    // 将更新后的路由信息存储到类的元数据中
    setMetadata(target.constructor, ROUTE_METADATA_KEY, routes)
  }
}

export function Query(queryName?: string) {
  return function (
    target: any,
    propertyKey: string | symbol,
    parameterIndex: number
  ) {
    const existingParams =
      getMetadata(target, PARAM_METADATA_KEY, propertyKey) || []

    existingParams.push({ type: 'query', name: queryName, parameterIndex })

    setMetadata(target, PARAM_METADATA_KEY, existingParams, propertyKey)
  }
}
export function Body(queryName?: string) {
  return function (
    target: any,
    propertyKey: string | symbol,
    parameterIndex: number
  ) {
    const existingParams =
      getMetadata(target, PARAM_METADATA_KEY, propertyKey) || []

    existingParams.push({ type: 'body', name: queryName, parameterIndex })

    setMetadata(target, PARAM_METADATA_KEY, existingParams, propertyKey)
  }
}
