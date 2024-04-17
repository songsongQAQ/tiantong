"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PARAMS = exports.METHOD = exports.PATH = exports.BASE_PATH = exports.INJECTABLE_WATERMARK = void 0;
/**
 * 表示可注入的装饰器标记。
 */
exports.INJECTABLE_WATERMARK = Symbol('INJECTABLE_WATERMARK');
/**
 * 控制器的基础路径元数据标记。
 */
exports.BASE_PATH = Symbol('BASE_PATH');
/**
 * 路由路径元数据标记。
 */
exports.PATH = Symbol('PATH');
/**
 * 路由请求方法元数据标记。
 */
exports.METHOD = Symbol('METHOD');
/**
 * 路由参数元数据标记。
 */
exports.PARAMS = Symbol('PARAMS');
