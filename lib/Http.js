"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Post = exports.Get = void 0;
var const_1 = require("./common/const");
/**
 * 函数装饰器工厂函数，用于标记请求方法为指定的 HTTP 方法。
 * @param {IMethod} method 请求方法（如 GET、POST、PUT 等）。
 * @returns 返回一个方法装饰器。
 */
function Request(method) {
    return function (path) {
        // 返回方法装饰器
        return function (target, propertyKey) {
            // 给实例对象的方法添加 path、method 这类元数据
            Reflect.defineMetadata(const_1.PATH, path || '', target, propertyKey);
            Reflect.defineMetadata(const_1.METHOD, method, target, propertyKey);
        };
    };
}
/**
 * 函数装饰器，用于标记请求方法为 GET 请求。
 * @param path 请求路径。
 * @returns 返回一个方法装饰器。
 */
exports.Get = Request('Get');
/**
 * 函数装饰器，用于标记请求方法为 POST 请求。
 * @param path 请求路径。
 * @returns 返回一个方法装饰器。
 */
exports.Post = Request('Post');
