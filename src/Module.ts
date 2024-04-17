/**
 * 一个装饰器函数，用于给目标类添加元数据。
 * @param metadata 元数据对象，包含要添加的元数据键值对。
 * @returns 返回一个装饰器函数。
 */
function Module(metadata: Record<string, any>) {
  return (target: any) => {
    for (const property in metadata) {
      // 给当前构造函数添加 imports、providers、controllers 这类元数据
      Reflect.defineMetadata(property, metadata[property], target)
    }
  }
}

export default Module
