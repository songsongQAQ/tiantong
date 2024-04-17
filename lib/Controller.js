"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var const_1 = require("./common/const");
/**
 * 类装饰器，用于标记控制器的基础路径。
 * @param path 控制器的基础路径。
 * @returns 返回一个类装饰器。
 */
function Controller(path) {
    // 返回类装饰器
    return function (target) {
        Reflect.defineMetadata(const_1.BASE_PATH, path, target);
    };
}
exports.default = Controller;
