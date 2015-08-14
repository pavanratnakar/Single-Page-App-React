/** @jsx React.DOM */
/* eslint-env */
"use strict";

require("node-jsx").install({extension: ".jsx"});

var fs = require("fs"),
    async = require("async"),
    React = require("react"),
    ReactApp = require("../components/App.jsx");

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
                var products = require("../data/products.json");

                var markup = React.renderToString(React.createElement(ReactApp, {
                    products: products
                }));

                res.render("general/body", {
                    markup: markup,
                    products: JSON.stringify(products)
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
