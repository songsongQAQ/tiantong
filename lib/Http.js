"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Post = exports.Get = void 0;
// Get/Post/Put/Delete/Patch/Options/Head等Http监听方法通用
var const_1 = require("./common/const");
function Request(method) {
    return function (path) {
        // 返回方法装饰器
        return function (target, propertyKey) {
            //给实例对象的方法添加 path、method 这类元数据
            Reflect.defineMetadata(const_1.PATH, path || '', target, propertyKey);
            Reflect.defineMetadata(const_1.METHOD, method, target, propertyKey);
        };
    };
}
exports.Get = Request('Get');
exports.Post = Request('Post');
