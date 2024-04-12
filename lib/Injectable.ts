import { INJECTABLE_WATERMARK } from './common/const'
function Injectable() {
  // 返回类装饰器
  return (target: any) => {
    Reflect.defineMetadata(INJECTABLE_WATERMARK, true, target)
  }
}

export default Injectable
