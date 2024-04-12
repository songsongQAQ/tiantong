import { BASE_PATH } from './common/const.ts'
function Controller(path: string) {
  // 返回类装饰器
  return function (target: any) {
    console.log('类target----------', target)
    Reflect.defineMetadata(BASE_PATH, path, target)
  }
}

export default Controller
