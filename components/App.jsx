var React = require('react'),
    Products = require('./Products.jsx'),
    Overlay = require('./Overlay.jsx');
    Error = require('./Error.jsx');

// Export the ReactApp component
var ReactApp = React.createClass({

    // CREATE QUERY HASH
    createQueryHash: function (filters) {
        if (!$.isEmptyObject(filters)) {
            window.location.hash = "#filters/" + JSON.stringify(filters);
        } else {
            window.location.hash = "#";
        }
    },

    // RENDER ERROR
    renderError: function () {
        var page = $(".error");

        page.addClass("visible");
    },

    // RENDER ALL PRODUCTS
    renderProductsPage: function (products) {
        var page = $(".all-products"),
            allProducts = $(".all-products .products-list > li");

        allProducts
            .addClass("hidden")
            .each(function (i, n) {
                products.forEach(function (p) {
                    if (parseInt(p.id, 10) === parseInt($(n).data("index"), 10)) {
                        $(n).removeClass("hidden");
                    }
                });
            });
        page.addClass("visible");
    },

    // RENDER SINGLE PRODUCT
    renderSingleProduct: function (index) {
        var page = $(".single-product"),
            c = $(".single-product .preview-large");

        this.props.products.forEach(function (product) {
            if (parseInt(product.id, 10) === parseInt(index, 10)) {
                c.find("h3").text(product.title);
                c.find("img").attr("src", "http://farm7.staticflickr.com/" + product.server + "/" + product.id + "_" + product.secret + "_z.jpg");
            }
        });
        page.addClass("visible");
    },

    // RENDER FILTERED PRODUCTS
    renderFilteredProducts: function () {
        var t = this,
            results = [];

        checkboxes.prop("checked", false);
        $.each(t.state.filters, function (index, filter) {
            t.props.products.forEach(function (product) {
                if (product[index] && filter.indexOf(product[index]) !== -1) {
                    $("input[name=" + index + "][value=" + product[index] + "]").prop("checked", true);
                    results.push(product);
                }
            });
        });
        t.renderProductsPage(results);
    },

    renderOnClient: function (url) {
        $(".main-content .page").removeClass("visible");
        var t = this,
            section = url.split("/")[0],
            mapping = {
                "": function () {
                    t.state.filters = {};
                    t.renderProductsPage(t.props.products);
                },
                "#product": function () {
                    var index = url.split("#product/")[1].trim();

                    renderSingleProduct(index);
                },
                "#filters": function () {
                    try {
                        this.state.filters = JSON.parse(url.split("#filters/")[1]);
                    } catch (err) {
                        window.location.hash = "#";
                        return;
                    }
                    renderFilteredProducts(t.state.filters, t.props.products);
                }
            };

        if (mapping[section]) {
            mapping[section]();
        } else {
            renderError();
        }
    },

    // Set the initial component state
    getInitialState: function (props) {

        props = props || this.props;

        // Set initial application state using props
        return {
            filters: {}
        };

    },

    componentWillReceiveProps: function (newProps, oldProps) {
        this.setState(this.getInitialState(newProps));
    },

    // Called directly after component rendering, only on client
    componentDidMount: function () {
        var t = this;

        $(window).on("hashchange", function () {
            t.renderOnClient(window.location.hash);
        });

        $(window).trigger("hashchange");
    },

    render: function () {
        return (
            <div className="main-content">
                <Products products={this.props.products} />
                <Overlay />
                <Error />
            </div>
        )
    }
});

module.exports = ReactApp;