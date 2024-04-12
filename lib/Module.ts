function Module(metadata: Record<string, any>) {
  return (target: any) => {
    for (const property in metadata) {
      console.log('property----------', property)
      Reflect.defineMetadata(property, metadata[property], target)
    }
  }
}

export default Module
