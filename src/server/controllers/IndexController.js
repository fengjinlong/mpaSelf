/* eslint-disable no-unused-vars */
import Controller from "./BaseController";
const { Readable } = require('stream')
class IndexController extends Controller {
    constructor() {
        super();
    }
    actionIndex1(ctx, next) {
        ctx.body = {
            home:"首页数据"
        }
    }
    async actionIndex(ctx, next) {
        ctx.body = await ctx.render('index/index')
    }
    async homeIndex(ctx, next) {
        console.log(await ctx.render('home/home'))
        console.log(111)
        // ctx.body = await ctx.render('home/home')
        let result = await ctx.render('home/home')

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