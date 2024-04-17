"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
var const_1 = require("./common/const");
/**
 * 表示工厂类。
 */
var Factory = /** @class */ (function () {
    function Factory() {
        this.routes = [];
        this.types = {};
    }
    /**
     * 创建路由。
     * @param options - 选项参数。
     */
    Factory.prototype.create = function (options) {
        var module = options.module;
        var imports = Reflect.getMetadata('imports', module) || [];
        var Controllers = this.initControllersByImports(imports);
        this.initRoute(Controllers);
    };
    /**
     * 递归初始化控制器。
     * @param imports - 导入项数组。
     * @returns 初始化后的控制器数组。
     */
    Factory.prototype.initControllersByImports = function (imports) {
        var _this = this;
        var Controllers = [];
        imports.forEach(function (Controller) {
            var mataControllers = Reflect.getMetadata('controllers', Controller);
            // 递归模块下的controller
            if (mataControllers === null || mataControllers === void 0 ? void 0 : mataControllers.length) {
                Controllers = __spreadArray(__spreadArray([], Controllers, true), mataControllers, true);
            }
            // 递归模块下的imports
            Controllers = __spreadArray(__spreadArray([], Controllers, true), _this.initControllersByImports(Reflect.getMetadata('imports', Controller) || []), true);
        });
        return Controllers;
    };
    /**
     * 初始化路由。
     * @param Controllers - 控制器数组。
     */
    Factory.prototype.initRoute = function (Controllers) {
        var _this = this;
        Controllers.forEach(function (Controller) {
            // 获取当前控制器的参数
            var paramtypes = Reflect.getMetadata('design:paramtypes', Controller);
            //TODO 暂时不考虑provider需要注入的情况
            var args = paramtypes.map(function (Type) {
                // 若未被Injectable装饰则报错
                if (!Reflect.getMetadata(const_1.INJECTABLE_WATERMARK, Type)) {
                    throw new Error("".concat(Type.name, " is not injectable!"));
                }
                // 返回缓存的type或新建type（只初始化一个Type实例）
                return _this.types[Type.name]
                    ? _this.types[Type.name]
                    : (_this.types[Type.name] = new Type());
            });
            // 获取当前控制器的基础路径
            var basePath = Reflect.getMetadata(const_1.BASE_PATH, Controller);
            // 获取当前控制器的方法
            var controller = new (Controller.bind.apply(Controller, __spreadArray([void 0], args, false)))();
            var proto = Reflect.getPrototypeOf(controller);
            var methodsNames = Object.getOwnPropertyNames(proto).filter(function (item) {
                return item !== 'constructor' && typeof proto[item] === 'function';
            });
            methodsNames.forEach(function (methodName) {
                var fn = proto[methodName];
                // 取出定义的 metadata
                var method = Reflect.getMetadata(const_1.METHOD, controller, methodName);
                var path = Reflect.getMetadata(const_1.PATH, controller, methodName);
                // 忽略未装饰方法
                if (!method) {
                    return;
                }
                path = "".concat(basePath ? "/".concat(basePath) : '').concat(path ? "/".concat(path) : '');
                // 构造并注册路由
                var route = {
                    path: path,
                    method: method.toLowerCase(),
                    //this的指向永远执行这个实例
                    fn: fn.bind(controller),
                    methodName: methodName,
                    controller: controller,
                };
                _this.registerRoute(route);
            });
        });
    };
    /**
     * 注册路由。
     * @param route - 路由信息。
     */
    Factory.prototype.registerRoute = function (route) {
        this.routes.push(route);
    };
    /**
     * 获取参数。
     * @param req - 请求对象。
     * @param paramsTypes - 参数类型数组。
     * @returns 参数数组。
     */
    Factory.prototype.getParams = function (req, paramsTypes) {
        return __awaiter(this, void 0, void 0, function () {
            var bodyData, url, params, _i, paramsTypes_1, paramsType, type, property, index, pathnameParams;
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        bodyData = null;
                        if (!(((_a = req.method) === null || _a === void 0 ? void 0 : _a.toLowerCase()) === 'post')) return [3 /*break*/, 2];
                        return [4 /*yield*/, req.json()];
                    case 1:
                        bodyData = _b.sent();
                        _b.label = 2;
                    case 2:
                        url = new URL(req.url);
                        params = [];
                        for (_i = 0, paramsTypes_1 = paramsTypes; _i < paramsTypes_1.length; _i++) {
                            paramsType = paramsTypes_1[_i];
                            type = paramsType.type, property = paramsType.property, index = paramsType.index;
                            pathnameParams = url.pathname.split('/');
                            switch (type) {
                                case 'body':
                                    params[index] = property ? bodyData === null || bodyData === void 0 ? void 0 : bodyData[property] : bodyData;
                                    break;
                                case 'query':
                                    params[index] = property
                                        ? url.searchParams.get(property)
                                        : Object.fromEntries(url.searchParams);
                                    break;
                                case 'param':
                                    params[index] = pathnameParams.slice(-paramsTypes.length)[index];
                            }
                        }
                        return [2 /*return*/, params];
                }
            });
        });
    };
    /**
     * 处理路由。
     * @param req - 请求对象。
     * @returns 响应对象。
     */
    Factory.prototype.handleRoute = function (req) {
        return __awaiter(this, void 0, void 0, function () {
            var url, path, reqMethod, router, paramsTypes, params, data;
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        url = new URL(req.url);
                        path = url.pathname.replace(/\/+$/, '');
                        reqMethod = (_a = req.method) === null || _a === void 0 ? void 0 : _a.toLowerCase();
                        router = this.routes.find(function (item) {
                            if (item.method !== reqMethod)
                                return false;
                            if (item.path === path) {
                                return true;
                            }
                            else if (item.path.split(':').length > 1) {
                                var regexPattern = item.path.replace(/:\w+/g, '\\w+');
                                var regex = new RegExp("^".concat(regexPattern, "$"));
                                //用来匹配 /user/1/garson == /user/:id/:name
                                return regex.test(path);
                            }
                        });
                        if (!!router) return [3 /*break*/, 1];
                        return [2 /*return*/, new Response('404')];
                    case 1:
                        paramsTypes = Reflect.getMetadata(const_1.PARAMS, router.controller, router.methodName) || [];
                        return [4 /*yield*/, this.getParams(req, paramsTypes)];
                    case 2:
                        params = _b.sent();
                        return [4 /*yield*/, router.fn.apply(router, params)];
                    case 3:
                        data = _b.sent();
                        return [2 /*return*/, Response.json({
                                code: 0,
                                data: data,
                            })];
                }
            });
        });
    };
    /**
     * 监听端口。
     * @param port - 端口号。
     */
    Factory.prototype.listen = function (port) {
        var _this = this;
        Bun.serve({
            port: port,
            fetch: function (req) { return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.handleRoute(req)];
                        case 1: return [2 /*return*/, _a.sent()];
                    }
                });
            }); },
        });
    };
    return Factory;
}());
exports.default = new Factory();
