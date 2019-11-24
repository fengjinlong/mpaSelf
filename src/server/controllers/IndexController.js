/* eslint-disable no-unused-vars */
import Controller from "./BaseController";
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
        ctx.body = await ctx.render('Index/index')
    }
    async homeIndex(ctx, next) {
        ctx.body = await ctx.render('Home/home')
    }
}
export default IndexController;