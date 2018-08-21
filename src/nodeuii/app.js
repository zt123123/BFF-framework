import Koa from "koa"
import router from "koa-simple-router"
import render from "koa-swig"
import server from "koa-static"
import co from "co"
import config from "./config";
import controllerInit from "./controllers";
import errorHandler from "./middlewares/errHandler";

import log4js from 'log4js';
import { join } from 'path';
log4js.configure({
    appenders: {
        cheese: {
            type: 'dateFile',
            filename: join(__dirname, '/logs/cheese.log'),
            pattern: '-yyyy-MM-dd.log',
            alwaysIncludePattern: true
        }
    },
    categories: { default: { appenders: ['cheese'], level: 'error' } }
});

const logger = log4js.getLogger('cheese');

const app = new Koa()
app.use(server(config.staticDir))
errorHandler.error(app, logger)
app.context.render = co.wrap(render({
    root: config.viewDir,
    autoescape: true,
    cache: 'memory', // disable, set to false
    ext: 'html',
    varControls: ["[[", "]]"],
    writeBody: false
}));

controllerInit(app, router)
app.listen(config.port, () => {
    console.log(`server listen at ${config.port}`);
})