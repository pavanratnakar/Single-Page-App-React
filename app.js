"use strict";

var env = require("env").env,
    async = require("async");

async.series({
    RunGrunt: function (next) {
        var child = require("child_process").spawn("./node_modules/grunt-cli/bin/grunt", [], {
            stdio: ["ignore", process.stdout, process.stderr]
        });
        process.once("SIGUSR2", function() {
            console.log("*** Killing Grunt...");
            if (child) {
                child.kill();
            }
            process.kill(process.pid, "SIGUSR2");
            next();
        });
        // child.on("close", function() {
        //    next();
        // });
        next();
    },
    Execute: function (next) {
        module.exports = require("./lib/server.js").http;
        next();
    }
});