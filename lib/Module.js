"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * 一个装饰器函数，用于给目标类添加元数据。
 * @param metadata 元数据对象，包含要添加的元数据键值对。
 * @returns 返回一个装饰器函数。
 */
function Module(metadata) {
    return function (target) {
        for (var property in metadata) {
            // 给当前构造函数添加 imports、providers、controllers 这类元数据
            Reflect.defineMetadata(property, metadata[property], target);
        }
    };
}
exports.default = Module;
