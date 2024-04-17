"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Query = exports.Param = exports.Body = exports.RouterParams = void 0;
var const_1 = require("./common/const");
/**
 * 路由参数装饰器工厂函数，用于指定路由方法的参数类型和属性名。
 * @param {'body' | 'param' | 'query'} type 参数类型，可选值为 'body'、'param' 或 'query'。
 * @returns {Function} 返回装饰器函数。
 */
var RouterParams = function (type) {
    return function (property) {
        return function (target, propertyKey, parameterIndex) {
            // 获取或定义路由方法的参数元数据
            var paramsTypes = Reflect.getMetadata(const_1.PARAMS, target, propertyKey) || [];
            // 存储参数类型、属性和索引到元数据中
            paramsTypes[parameterIndex] = {
                index: parameterIndex,
                property: property,
                type: type,
            };
            Reflect.defineMetadata(const_1.PARAMS, paramsTypes, target, propertyKey);
        };
    };
};
exports.RouterParams = RouterParams;
/**
 * 装饰器函数，用于指定路由方法的参数类型为 'body'。
 * @function Body
 * @param {string} [property] 参数属性名，可选。
 * @returns {Function} 返回装饰器函数。
 */
exports.Body = (0, exports.RouterParams)('body');
/**
 * 装饰器函数，用于指定路由方法的参数类型为 'param'。
 * @function Param
 * @param {string} [property] 参数属性名，可选。
 * @returns {Function} 返回装饰器函数。
 */
exports.Param = (0, exports.RouterParams)('param');
/**
 * 装饰器函数，用于指定路由方法的参数类型为 'query'。
 * @function Query
 * @param {string} [property] 参数属性名，可选。
 * @returns {Function} 返回装饰器函数。
 */
exports.Query = (0, exports.RouterParams)('query');
