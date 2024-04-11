import {
  PARAM_METADATA_KEY,
  ROUTE_METADATA_KEY,
  type IRoutes,
} from './modifier.ts'
import { extractBody, extractQuery, getMetadata } from './utils.ts'

//储存的参数类型
interface MetadataParams {
  type: 'query' | 'param' | 'body'
  name: string
  parameterIndex: 0
}

export class Server {
  controllers: any[]
  routes: IRoutes
  constructor(controllers: any[]) {
    this.controllers = controllers
    this.routes = {}
    this.controllers.forEach((_) => {
      const mateRoutes = getMetadata(_.constructor, ROUTE_METADATA_KEY) || {}

      this.routes = { ...this.routes, ...mateRoutes }
    })
  }
  async handleRequest(req: Request) {
    try {
      const url = new URL(req.url)
      const pathname = url.pathname.replace(/\/+$/, '')
      console.log('pathname----------', pathname)
      const reqMethod = req.method?.toLowerCase()
      // 检查请求路径是否与路由信息匹配
      const { handler, method, target } = this.routes?.[pathname] || {}

      if (handler && reqMethod === method) {
        const handlerInstance = new target.constructor()
        // @ts-ignore
        const handlerName = handler.name as string

        const metadataParams: MetadataParams[] =
          getMetadata(target, PARAM_METADATA_KEY, handlerName) || []

        // 从请求中提取参数值
        const args = new Array(metadataParams.length)

        //如果是post请求
        let body
        if (reqMethod === 'post') {
          body = await req.json()
        }

        for (const params of metadataParams) {
          const { type, name, parameterIndex } = params
          switch (type) {
            case 'query':
              args[parameterIndex] = extractQuery(req, name)
              break
            case 'body':
              args[parameterIndex] = await extractBody(body, name)
              break
          }
        }
        // 调用处理函数，传入提取的参数值
        // @ts-ignore
        const data = await handler.apply(handlerInstance, args)
        return Response.json({
          code: 0,
          data,
        })
      }

      // 如果没有匹配到路由，返回 404
      return new Response('404 - Not Found', { status: 404 })
    } catch (error) {
      // @ts-ignore
      return new Response(error, { status: 500 })
    }
  }
}
