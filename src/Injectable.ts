import { INJECTABLE_WATERMARK } from './common/const'
/**
 * 类装饰器函数，用于标记类为可注入的。
 * @returns 返回一个类装饰器。
 */
function Injectable() {
  // 返回类装饰器
  return (target: any) => {
    Reflect.defineMetadata(INJECTABLE_WATERMARK, true, target)
  }
}

export default Injectable
