/**
 * 函数装饰器，用于标记请求方法为 GET 请求。
 * @param path 请求路径。
 * @returns 返回一个方法装饰器。
 */
export declare const Get: (path?: string) => (target: any, propertyKey: string) => void;
/**
 * 函数装饰器，用于标记请求方法为 POST 请求。
 * @param path 请求路径。
 * @returns 返回一个方法装饰器。
 */
export declare const Post: (path?: string) => (target: any, propertyKey: string) => void;
