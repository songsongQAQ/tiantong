export interface IOptions {
    module: any;
}
export interface IRouter {
    path: string;
    method: 'get' | 'post';
    fn: (...args: any) => Promise<any>;
    methodName: string;
    controller: any;
}
export interface IParamsTypes {
    index: number;
    property: string;
    type: 'body' | 'query' | 'param';
}
declare class Factory {
    private routes;
    private types;
    constructor();
    create(options: IOptions): void;
    /**
     * 递归获取模块下的controller
     *
     * @param {any[]} imports - 一个导入项数组
     * @return {  any[]} 初始化后的控制器
     */
    initControllersByImports(imports: any[]): any[];
    initRoute(Controllers: any[]): void;
    registerRoute(route: IRouter): void;
    getParams(req: Request, paramsTypes: IParamsTypes[]): Promise<any[]>;
    handleRoute(req: Request): Promise<Response>;
    listen(port: number): void;
}
declare const _default: Factory;
export default _default;
