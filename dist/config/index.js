'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var _ = _interopDefault(require('lodash'));
var path = _interopDefault(require('path'));

let config = {
    "viewDir": path.join(__dirname, "../views"),
    "staticDir": path.join(__dirname, "../assets"),
};

const init = () => {
    {
        const proConfig = {
            port: 80
        };
        config = _.extend(config, proConfig);
    }
    return config
};

const result = init();

module.exports = result;
