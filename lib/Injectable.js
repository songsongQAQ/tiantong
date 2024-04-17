"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var const_1 = require("./common/const");
function Injectable() {
    // 返回类装饰器
    return function (target) {
        Reflect.defineMetadata(const_1.INJECTABLE_WATERMARK, true, target);
    };
}
exports.default = Injectable;
