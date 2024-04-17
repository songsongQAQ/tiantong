"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var const_1 = require("./common/const");
function Controller(path) {
    // 返回类装饰器
    return function (target) {
        Reflect.defineMetadata(const_1.BASE_PATH, path, target);
    };
}
exports.default = Controller;
