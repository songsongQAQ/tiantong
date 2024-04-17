import { METHOD, PATH } from './common/const'

type IMethod = 'Get' | 'Post' | 'Put' | 'Delete' | 'Patch' | 'Options' | 'Head'

/**
 * 函数装饰器工厂函数，用于标记请求方法为指定的 HTTP 方法。
 * @param {IMethod} method 请求方法（如 GET、POST、PUT 等）。
 * @returns 返回一个方法装饰器。
 */
function Request(method: IMethod) {
  return function (path?: string) {
    // 返回方法装饰器
    return function (target: any, propertyKey: string) {
      // 给实例对象的方法添加 path、method 这类元数据
      Reflect.defineMetadata(PATH, path || '', target, propertyKey)
      Reflect.defineMetadata(METHOD, method, target, propertyKey)
    }
  }
}

/**
 * 函数装饰器，用于标记请求方法为 GET 请求。
 * @param path 请求路径。
 * @returns 返回一个方法装饰器。
 */
export const Get = Request('Get')

/**
 * 函数装饰器，用于标记请求方法为 POST 请求。
 * @param path 请求路径。
 * @returns 返回一个方法装饰器。
 */
export const Post = Request('Post')
