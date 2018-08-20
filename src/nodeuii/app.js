import Koa from "koa"
import router from "koa-simple-router"
import render from "koa-swig"
import server from "koa-static"
import co from "co"
import config from "./config";
import controllerInit from "./controllers";

const app = new Koa()
app.use(server(config.staticDir))
app.context.render = co.wrap(render({
    root: config.viewDir,
    autoescape: true,
    cache: 'memory', // disable, set to false
    ext: 'html',
    varControls:["[[","]]"],
    writeBody: false
}));

controllerInit(app, router)
app.listen(config.port, () => {
    console.log(`server listen at ${config.port}`);
})