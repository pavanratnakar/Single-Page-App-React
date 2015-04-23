"use strict";

var fs = require("fs"),
    async = require("async"),
    React = require("react");

var JSX = require("node-jsx").install();

module.exports = function (app) {
    var LoadPage = function(req, res) {
        res.type("html");
        res.write("");
        async.auto({
            Init: function (next) {
                next(null, {

                });
            },
            Head: ["Init", function (next) {
                res.render("general/head", {}, next);
            }],
            Main: ["Init", function (next) {
                res.render("general/body", {
                    products: require("../data/products.json")
                }, next);
            }],
            Tail: ["Init", function (next) {
                res.render("general/tail", {}, next);
            }]
        }, function (err, html) {
            if (err) {
                res.write("Error");
            } else {
                res.write(html.Head + html.Main + html.Tail);
            }
            res.end();
        });
    };

    app.get("/react", LoadPage);
    app.get("/", function (req, res) {
        res.type("html");
        res.end(fs.readFileSync("index.html"));
    });
};