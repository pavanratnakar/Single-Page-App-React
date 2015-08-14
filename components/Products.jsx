"use strict";

var React = require("react"),
    Filters = require("./Filters.jsx"),
    Product = require("./Product.jsx");

// Export the ReactApp component
var Products = React.createClass({
    // Set the initial component state
    getInitialState: function () {
        return {
            farm: "farm7.staticflickr.com"
        };
    },

    productChange: function (index) {
        this.props.productChange(index);
    },

    filterChange: function () {
        this.props.filterChange.apply(this, arguments);
    },

    filterReset: function () {
        this.props.filterReset.apply(this, arguments);
    },

    render: function () {
        var t = this;

        var products = t.props.products.map(function (p) {
            return (
                <Product key={p.id} id={p.id} server={p.server} secret={p.secret} title={p.title} farm={t.state.farm} onClick={t.productChange} />
            );
        });

        return (
            <div className="all-products page">
                <Filters categories={t.props.categories} filterChange={this.filterChange} filterReset={this.filterReset} />
                <ul className="products-list">
                    {products}
                </ul>
            </div>
        );
    }
});

module.exports = Products;
