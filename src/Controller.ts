import { BASE_PATH } from './common/const'
function Controller(path: string) {
  // 返回类装饰器
  return function (target: any) {
    Reflect.defineMetadata(BASE_PATH, path, target)
  }
}

export default Controller
