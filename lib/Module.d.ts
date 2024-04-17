/**
 * 一个装饰器函数，用于给目标类添加元数据。
 * @param metadata 元数据对象，包含要添加的元数据键值对。
 * @returns 返回一个装饰器函数。
 */
declare function Module(metadata: Record<string, any>): (target: any) => void;
export default Module;
