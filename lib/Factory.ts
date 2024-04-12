import { BASE_PATH, METHOD, PATH } from '~/lib/common/const.ts'

export interface IOptions {
  module: any
}
export interface IRouter {
  path: string
  method: 'get' | 'post'
  fn: () => Promise<any>
}
class Factory {
  routes: IRouter[]

  constructor() {
    this.routes = []
  }

  create(options: IOptions) {
    const { module } = options
    const imports = Reflect.getMetadata('imports', module) || []
    const Controllers = this.initControllersByImports(imports)
    this.initRoute(Controllers)
  }

  /**
   * 递归获取模块下的controller
   *
   * @param {any[]} imports - 一个导入项数组
   * @return {  any[]} 初始化后的控制器
   */
  initControllersByImports(imports: any[]): any[] {
    let Controllers: any[] = []
    imports.forEach((Controller: any) => {
      const mateControllers = Reflect.getMetadata('controllers', Controller)
      // 递归模块下的controller
      if (mateControllers?.length) {
        Controllers = [...Controllers, ...mateControllers]
      }
      // 递归模块下的imports
      Controllers = [
        ...Controllers,
        ...this.initControllersByImports(
          Reflect.getMetadata('imports', Controller) || []
        ),
      ]
    })
    return Controllers
  }

  initRoute(Controllers: any[]) {
    Controllers.forEach((Controller: any) => {
      // 获取当前控制器的基础路径
      const basePath = Reflect.getMetadata(BASE_PATH, Controller)
      // 获取当前控制器的方法
      const controller = new Controller()
      const proto: any = Reflect.getPrototypeOf(controller)
      const methodsNames = Object.getOwnPropertyNames(proto).filter(
        (item: string) =>
          item !== 'constructor' && typeof proto[item] === 'function'
      )
      methodsNames.forEach((methodName) => {
        const fn = proto[methodName]
        // 取出定义的 metadata
        const method = Reflect.getMetadata(METHOD, controller, methodName)
        let path = Reflect.getMetadata(PATH, controller, methodName)
        // 忽略未装饰方法
        if (!method) {
          return
        }
        path = `${basePath ? `/${basePath}` : ''}${path ? `/${path}` : ''}`
        // 构造并注册路由
        const route = {
          path: path,
          method: method.toLowerCase(),
          fn: fn.bind(controller),
        }
        this.registerRoute(route)
      })
    })
  }

  registerRoute(route: IRouter) {
    this.routes.push(route)
  }

  async handleRoute(req: Request) {
    const url = new URL(req.url)
    const path = url.pathname.replace(/\/+$/, '')
    const reqMethod = req.method?.toLowerCase()
    const router = this.routes.find(
      (item) => item.path === path && item.method === reqMethod
    )
    if (!router) {
      return new Response('404')
    } else {
      const data = await router.fn()
      return Response.json({
        code: 0,
        data,
      })
    }
  }

  listen(port: number) {
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const _this = this
    Bun.serve({
      port: port,
      async fetch(req: Request): Promise<any> {
        return await _this.handleRoute(req)
      },
    })
  }
}

export default new Factory()
