function Module(metadata: Record<string, any>) {
  return (target: any) => {
    for (const property in metadata) {
      //给当前构造函数添加 imports、providers、controllers 这类元数据
      Reflect.defineMetadata(property, metadata[property], target)
    }
  }
}

export default Module
