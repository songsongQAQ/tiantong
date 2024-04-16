// Get/Post/Put/Delete/Patch/Options/Head等Http监听方法通用
import { METHOD, PATH } from './common/const'
function Request(method: string) {
  return function (path?: string) {
    // 返回方法装饰器
    return function (target: any, propertyKey: string) {
      //给实例对象的方法添加 path、method 这类元数据
      Reflect.defineMetadata(PATH, path || '', target, propertyKey)
      Reflect.defineMetadata(METHOD, method, target, propertyKey)
    }
  }
}

export const Get = Request('Get')
export const Post = Request('Post')
