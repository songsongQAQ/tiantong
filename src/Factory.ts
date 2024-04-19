import {
  BASE_PATH,
  INJECTABLE_WATERMARK,
  METHOD,
  PARAMS,
  PATH,
} from './common/const'

/**
 * 表示可注入的选项接口。
 */
export interface IOptions {
  module: any
}

/**
 * 表示路由器接口。
 */
export interface IRouter {
  path: string
  method: 'get' | 'post'
  fn: (...args: any) => Promise<any>
  methodName: string
  controller: any
}

/**
 * 表示路由参数类型接口。
 */
export interface IParamsTypes {
  index: number
  property: string
  type: 'body' | 'query' | 'param'
}

/**
 * 表示工厂类。
 */
class Factory {
  private routes: IRouter[]
  private types: Record<string, any>

  constructor() {
    this.routes = []
    this.types = {}
  }

  /**
   * 创建路由。
   * @param options - 选项参数。
   */
  create(options: IOptions): void {
    const { module } = options
    const imports = Reflect.getMetadata('imports', module) || []
    const Controllers = this.initControllersByImports(imports)
    this.initRoute(Controllers)
  }

  /**
   * 递归初始化控制器。
   * @param imports - 导入项数组。
   * @returns 初始化后的控制器数组。
   */
  initControllersByImports(imports: any[]): any[] {
    let Controllers: any[] = []
    imports.forEach((Controller: any) => {
      const mataControllers = Reflect.getMetadata('controllers', Controller)
      // 递归模块下的controller
      if (mataControllers?.length) {
        Controllers = [...Controllers, ...mataControllers]
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

  /**
   * 初始化路由。
   * @param Controllers - 控制器数组。
   */
  initRoute(Controllers: any[]): void {
    Controllers.forEach((Controller: any) => {
      // 获取当前控制器的参数
      const paramtypes = Reflect.getMetadata('design:paramtypes', Controller)

      //TODO 暂时不考虑provider需要注入的情况

      const args = this.generateArgs(Controller)
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
  generateArgs(Controller: any) {
    const paramtypes = Reflect.getMetadata('design:paramtypes', Controller)

    //TODO 暂时不考虑provider需要注入的情况

    return paramtypes.map((Type: any) => {
      // 若未被Injectable装饰则报错
      if (!Reflect.getMetadata(INJECTABLE_WATERMARK, Type)) {
        throw new Error(`${Type.name} is not injectable!`)
      }
      // 返回缓存的type或新建type（只初始化一个Type实例）
      if (!this.types[Type.name]) {
        const args = this.generateArgs(Type) || []
        this.types[Type.name] = new Type(...args)
      }
      return this.types[Type.name]
    })
  }
  /**
   * 注册路由。
   * @param route - 路由信息。
   */
  registerRoute(route: IRouter): void {
    this.routes.push(route)
  }

  /**
   * 获取参数。
   * @param req - 请求对象。
   * @param paramsTypes - 参数类型数组。
   * @returns 参数数组。
   */
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

  /**
   * 处理路由。
   * @param req - 请求对象。
   * @returns 响应对象。
   */
  async handleRoute(req: Request): Promise<Response> {
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
    console.log('request url ----------', path)
    if (!router) {
      return new Response('not found', {
        status: 404,
      })
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

  /**
   * 监听端口。
   * @param port - 端口号。
   */
  listen(port: number): void {
    console.log(
      ' _____ _           _____                       _ ____  \n' +
        '|_   _(_) __ _ _ _|_   _|__  _ __   __ _      | / ___| \n' +
        "  | | | |/ _` | '_ \\| |/ _ \\| '_ \\ / _` |  _  | \\___ \\ \n" +
        '  | | | | (_| | | | | | (_) | | | | (_| | | |_| |___) |\n' +
        '  |_| |_|\\__,_|_| |_|_|\\___/|_| |_|\\__, |  \\___/|____/ \n' +
        '                                   |___/               '
    )
    console.log('listen', port)
    Bun.serve({
      port: port,
      fetch: async (req: Request): Promise<Response> => {
        try {
          return await this.handleRoute(req)
        } catch (err) {
          return new Response(JSON.stringify(err), {
            status: 500,
          })
        }
      },
    })
  }
}

export default new Factory()
