"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
/**
 * @fileoverview 实现Index数据模型
 * @author 249812928@qq.com
 */

/**
* IndexModel类
* @class
*/

class IndexMode {
    /**
     * @constructor
     * @param {string} app koa2上下文
     */
    constructor(app) {}

    /**
     * 获取具体数据的API接口
     * @returns {Promise} 返回异步数据
     * @example
     * retur nnew Promise
     * getData()
     */

    getData() {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve("IndexAction异步数据");
            }, 1000);
        }).catch(err => {
            reject(err);
        });
    }
}

exports.default = IndexMode;