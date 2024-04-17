"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Query = exports.Param = exports.Body = void 0;
var const_1 = require("./common/const");
var Body = function (property) {
    return function (target, propertyKey, parameterIndex) {
        var paramsTypes = Reflect.getMetadata(const_1.PARAMS, target, propertyKey) || [];
        paramsTypes[parameterIndex] = {
            index: parameterIndex,
            property: property,
            type: 'body',
        };
        Reflect.defineMetadata(const_1.PARAMS, paramsTypes, target, propertyKey);
    };
};
exports.Body = Body;
var Param = function (property) {
    return function (target, propertyKey, parameterIndex) {
        var paramsTypes = Reflect.getMetadata(const_1.PARAMS, target, propertyKey) || [];
        paramsTypes[parameterIndex] = {
            index: parameterIndex,
            property: property,
            type: 'param',
        };
        Reflect.defineMetadata(const_1.PARAMS, paramsTypes, target, propertyKey);
    };
};
exports.Param = Param;
var Query = function (property) {
    return function (target, propertyKey, parameterIndex) {
        var paramsTypes = Reflect.getMetadata(const_1.PARAMS, target, propertyKey) || [];
        paramsTypes[parameterIndex] = {
            index: parameterIndex,
            property: property,
            type: 'query',
        };
        Reflect.defineMetadata(const_1.PARAMS, paramsTypes, target, propertyKey);
    };
};
exports.Query = Query;
