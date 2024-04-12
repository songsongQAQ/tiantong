// Get/Post/Put/Delete/Patch/Options/Head等Http监听方法通用
import { METHOD, PATH } from './common/const'
function Request(method: string) {
  return function (path: string) {
    // 返回方法装饰器
    return function (target: any, propertyKey: string) {
      console.log('方法target----------', target)
      Reflect.defineMetadata(PATH, method, target, propertyKey)
      Reflect.defineMetadata(METHOD, method, target, propertyKey)
    }
  }
}

export const Get = Request('Get')
export const Post = Request('Post')
