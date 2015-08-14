"use strict";

var async = require("async");

async.series({
    Execute: function (next) {
        module.exports = require("./lib/server.js").http;
        next();
    }
});
