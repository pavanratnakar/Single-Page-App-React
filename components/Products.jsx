var React = require('react'),
    Filters = require('./Filters.jsx'),
    Product = require('./Product.jsx');

// Export the ReactApp component
var Products = React.createClass({
    // Set the initial component state
    getInitialState: function (props) {
        return {
            farm: 'farm7.staticflickr.com'
        };
    },

    render: function () {
        var t = this;

        var products = t.props.products.map(function (p) {
            return (
                <Product key={p.id} id={p.id} server={p.server} secret={p.secret} title={p.title} farm={t.state.farm} />
            )
        });

        return (
            <div className="all-products page">
                <Filters />
                <ul className="products-list">
                    {products}
                </ul>
            </div>
        )
    }
});

module.exports = Products;