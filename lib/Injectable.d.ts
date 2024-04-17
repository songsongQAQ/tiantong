/**
 * 类装饰器函数，用于标记类为可注入的。
 * @returns 返回一个类装饰器。
 */
declare function Injectable(): (target: any) => void;
export default Injectable;
