import { BASE_PATH } from './common/const'

/**
 * 类装饰器，用于标记控制器的基础路径。
 * @param path 控制器的基础路径。
 * @returns 返回一个类装饰器。
 */
function Controller(path: string) {
  // 返回类装饰器
  return function (target: any) {
    Reflect.defineMetadata(BASE_PATH, path, target)
  }
}

export default Controller
