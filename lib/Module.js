"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function Module(metadata) {
    return function (target) {
        for (var property in metadata) {
            //给当前构造函数添加 imports、providers、controllers 这类元数据
            Reflect.defineMetadata(property, metadata[property], target);
        }
    };
}
exports.default = Module;
