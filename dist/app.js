"use strict";

var _koa = require("koa");

var _koa2 = _interopRequireDefault(_koa);

var _koaSimpleRouter = require("koa-simple-router");

var _koaSimpleRouter2 = _interopRequireDefault(_koaSimpleRouter);

var _koaSwig = require("koa-swig");

var _koaSwig2 = _interopRequireDefault(_koaSwig);

var _koaStatic = require("koa-static");

var _koaStatic2 = _interopRequireDefault(_koaStatic);

var _awilix = require("awilix");

var _awilixKoa = require("awilix-koa");

var _co = require("co");

var _co2 = _interopRequireDefault(_co);

var _config = require("./config");

var _config2 = _interopRequireDefault(_config);

var _errHandler = require("./middlewares/errHandler");

var _errHandler2 = _interopRequireDefault(_errHandler);

var _log4js = require("log4js");

var _log4js2 = _interopRequireDefault(_log4js);

var _path = require("path");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_log4js2.default.configure({
    appenders: {
        cheese: {
            type: 'dateFile',
            filename: (0, _path.join)(__dirname, '/logs/cheese.log'),
            pattern: '-yyyy-MM-dd.log',
            alwaysIncludePattern: true
        }
    },
    categories: { default: { appenders: ['cheese'], level: 'error' } }
});

const logger = _log4js2.default.getLogger('cheese');

const app = new _koa2.default();

const container = (0, _awilix.createContainer)();

app.use((0, _awilixKoa.scopePerRequest)(container));

container.loadModules([(0, _path.join)(__dirname, "/service/*.js")], {
    formatName: "camelCase",
    resolverOptions: {
        lifetime: _awilix.Lifetime.SCOPED
    }
});

app.use((0, _awilixKoa.loadControllers)("controllers/*.js", { cwd: __dirname }));

app.context.render = _co2.default.wrap((0, _koaSwig2.default)({
    root: _config2.default.viewDir,
    autoescape: true,
    cache: 'memory', // disable, set to false
    ext: 'html',
    varControls: ["[[", "]]"],
    writeBody: false
}));

app.use((0, _koaStatic2.default)(_config2.default.staticDir));

_errHandler2.default.error(app, logger);

app.listen(_config2.default.port, () => {
    logger.log(`server listen at ${_config2.default.port}`);
});