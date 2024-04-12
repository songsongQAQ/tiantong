export interface IOptions {
  port?: number
  module: any
}
class Factory {
  constructor() {}
  create(options: IOptions) {
    const { module, port } = options
    Bun.serve({
      port: port || 3000,
      async fetch(req: any): Promise<any> {
        console.log('module----------', module)
        console.log('req----------', req)
        return new Response('1')
      },
    })
  }
}

export default new Factory()
