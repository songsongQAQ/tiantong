"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var const_1 = require("./common/const");
/**
 * 类装饰器函数，用于标记类为可注入的。
 * @returns 返回一个类装饰器。
 */
function Injectable() {
    // 返回类装饰器
    return function (target) {
        Reflect.defineMetadata(const_1.INJECTABLE_WATERMARK, true, target);
    };
}
exports.default = Injectable;
