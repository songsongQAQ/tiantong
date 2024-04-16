import {
  BASE_PATH,
  INJECTABLE_WATERMARK,
  METHOD,
  PARAMS,
  PATH,
} from '~/lib/common/const.ts'

export interface IOptions {
  module: any
}
export interface IRouter {
  path: string
  method: 'get' | 'post'
  fn: (...args: any) => Promise<any>
  methodName: string
  controller: any
}
export interface IParamsTypes {
  index: number
  property: string
  type: 'body' | 'query' | 'param'
}
class Factory {
  private routes: IRouter[]
  private types: Record<string, any>
  constructor() {
    this.routes = []
    this.types = {}
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
      // 获取当前控制器的参数
      const paramtypes = Reflect.getMetadata('design:paramtypes', Controller)

      //TODO 暂时不考虑provider需要注入的情况

      const args = paramtypes.map((Type: any) => {
        // 若未被Injectable装饰则报错
        if (!Reflect.getMetadata(INJECTABLE_WATERMARK, Type)) {
          throw new Error(`${Type.name} is not injectable!`)
        }
        // 返回缓存的type或新建type（只初始化一个Type实例）
        return this.types[Type.name]
          ? this.types[Type.name]
          : (this.types[Type.name] = new Type())
      })

      // 获取当前控制器的基础路径
      const basePath = Reflect.getMetadata(BASE_PATH, Controller)
      // 获取当前控制器的方法
      const controller = new Controller(...args)
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
          //this的指向永远执行这个实例
          fn: fn.bind(controller),
          methodName: methodName,
          controller,
        }
        this.registerRoute(route)
      })
    })
  }

  registerRoute(route: IRouter) {
    this.routes.push(route)
  }
  async getParams(req: Request, paramsTypes: IParamsTypes[]): Promise<any[]> {
    //body参数 流只能使用一次
    let bodyData = null
    if (req.method?.toLowerCase() === 'post') {
      bodyData = await req.json()
    }
    const url = new URL(req.url)

    const params = []
    for (const paramsType of paramsTypes) {
      const { type, property, index } = paramsType
      // /user/1/garson 分割成 [ "", "user", "1", "garson" ]
      const pathnameParams = url.pathname.split('/')

      switch (type) {
        case 'body':
          params[index] = property ? bodyData?.[property] : bodyData
          break
        case 'query':
          params[index] = property
            ? url.searchParams.get(property)
            : Object.fromEntries(url.searchParams)
          break
        case 'param':
          params[index] = pathnameParams.slice(-paramsTypes.length)[index]
      }
    }
    return params
  }

  async handleRoute(req: Request) {
    const url = new URL(req.url)
    const path = url.pathname.replace(/\/+$/, '')
    const reqMethod = req.method?.toLowerCase()
    const router = this.routes.find((item) => {
      if (item.method !== reqMethod) return false
      if (item.path === path) {
        return true
      } else if (item.path.split(':').length > 1) {
        const regexPattern = item.path.replace(/:\w+/g, '\\w+')
        const regex = new RegExp(`^${regexPattern}$`)
        //用来匹配 /user/1/garson == /user/:id/:name
        return regex.test(path)
      }
    })
    if (!router) {
      return new Response('404')
    } else {
      const paramsTypes =
        Reflect.getMetadata(PARAMS, router.controller, router.methodName) || []
      //重构参数
      const params: any[] = await this.getParams(req, paramsTypes)

      const data = await router.fn(...params)

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
