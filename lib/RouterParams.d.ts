/**
 * 定义路由参数的类型，可选值为 'body'、'query' 或 'param'。
 */
type IRouterParamsType = 'body' | 'query' | 'param';
/**
 * 装饰器函数，用于装饰类的方法参数。
 * @param {any} target 目标对象。
 * @param {string} propertyKey 属性名称。
 * @param {number} parameterIndex 参数索引。
 */
type IRouterParamsPropertyFn = (target: any, propertyKey: string, parameterIndex: number) => void;
/**
 * 路由参数装饰器工厂函数，用于指定路由方法的参数类型和属性名。
 * @param {'body' | 'param' | 'query'} type 参数类型，可选值为 'body'、'param' 或 'query'。
 * @returns {Function} 返回装饰器函数。
 */
export declare const RouterParams: (type: IRouterParamsType) => (property: string) => IRouterParamsPropertyFn;
/**
 * 装饰器函数，用于指定路由方法的参数类型为 'body'。
 * @function Body
 * @param {string} [property] 参数属性名，可选。
 * @returns {Function} 返回装饰器函数。
 */
export declare const Body: (property: string) => IRouterParamsPropertyFn;
/**
 * 装饰器函数，用于指定路由方法的参数类型为 'param'。
 * @function Param
 * @param {string} [property] 参数属性名，可选。
 * @returns {Function} 返回装饰器函数。
 */
export declare const Param: (property: string) => IRouterParamsPropertyFn;
/**
 * 装饰器函数，用于指定路由方法的参数类型为 'query'。
 * @function Query
 * @param {string} [property] 参数属性名，可选。
 * @returns {Function} 返回装饰器函数。
 */
export declare const Query: (property: string) => IRouterParamsPropertyFn;
export {};
