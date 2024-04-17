/**
 * 表示可注入的选项接口。
 */
export interface IOptions {
    module: any;
}
/**
 * 表示路由器接口。
 */
export interface IRouter {
    path: string;
    method: 'get' | 'post';
    fn: (...args: any) => Promise<any>;
    methodName: string;
    controller: any;
}
/**
 * 表示路由参数类型接口。
 */
export interface IParamsTypes {
    index: number;
    property: string;
    type: 'body' | 'query' | 'param';
}
/**
 * 表示工厂类。
 */
declare class Factory {
    private routes;
    private types;
    constructor();
    /**
     * 创建路由。
     * @param options - 选项参数。
     */
    create(options: IOptions): void;
    /**
     * 递归初始化控制器。
     * @param imports - 导入项数组。
     * @returns 初始化后的控制器数组。
     */
    initControllersByImports(imports: any[]): any[];
    /**
     * 初始化路由。
     * @param Controllers - 控制器数组。
     */
    initRoute(Controllers: any[]): void;
    /**
     * 注册路由。
     * @param route - 路由信息。
     */
    registerRoute(route: IRouter): void;
    /**
     * 获取参数。
     * @param req - 请求对象。
     * @param paramsTypes - 参数类型数组。
     * @returns 参数数组。
     */
    getParams(req: Request, paramsTypes: IParamsTypes[]): Promise<any[]>;
    /**
     * 处理路由。
     * @param req - 请求对象。
     * @returns 响应对象。
     */
    handleRoute(req: Request): Promise<Response>;
    /**
     * 监听端口。
     * @param port - 端口号。
     */
    listen(port: number): void;
}
declare const _default: Factory;
export default _default;
