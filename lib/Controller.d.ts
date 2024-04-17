/**
 * 类装饰器，用于标记控制器的基础路径。
 * @param path 控制器的基础路径。
 * @returns 返回一个类装饰器。
 */
declare function Controller(path: string): (target: any) => void;
export default Controller;
