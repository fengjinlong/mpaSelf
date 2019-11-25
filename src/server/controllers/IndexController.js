/* eslint-disable no-unused-vars */
import Controller from "./BaseController";
const { Readable } = require('stream')
// 缓存
const LRU = require("lru-cache")
const options = {
    max: 500, 
    length: function (n, key) { return n * 2 + key.length }, 
    dispose: function (key, n) { n.close() }, 
    maxAge: 1000 * 60 * 60
}
const cache = new LRU(options)
console.log(cache)
// const cache = new LRU(50)
class IndexController extends Controller {
    constructor() {
        super();
    }
    actionIndex1(ctx, next) {
        ctx.body = {
            home: "首页数据"
        }
    }
    async actionIndex(ctx, next) {
        ctx.body = await ctx.render('index/index',{data: [11,21,13]})
    }
    async homeIndex(ctx, next) {

        let _cache = cache.get('home/home');
        let result
        if (_cache) {
            console.log('有缓存')
            result = _cache
        } else {
            console.log('无缓存')
            result = await ctx.render('home/home')
            cache.set('home/home', result)
        }
        // ctx.setHeader('Cache-Control', 'max-age=3600')

        // 流式传送
        ctx.status = 200
        ctx.type = 'html'
        function createSsrStreamPromise() {
            return new Promise((resolve, reject) => {
                let stream = new Readable()
                stream.push(result)
                stream.push(null)
                stream.on('error', err => { reject(err) }).pipe(ctx.res)
            })
        }
        await createSsrStreamPromise()
    }
}
export default IndexController;