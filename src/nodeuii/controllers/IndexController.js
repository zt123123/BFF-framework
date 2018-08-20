import IndexModel from "../models/IndexModel"
class IndexController {
    constructor() {

    }

    indexAction() {
        return async (ctx, next) => {
            const IndexModelIns = new IndexModel()
            const result = await IndexModelIns.getData()
            ctx.body = await ctx.render('index', {
                data: result
            })
        }
    }
}

export default IndexController