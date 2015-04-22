/*global $:false, jQuery:false, Handlebars:false, window:false*/
/*!
 * App v0.1.0
 */
jQuery(function($) {
    "use strict";
    var filters = {},
        products = [],
        checkboxes = $(".all-products input[type=checkbox]");

    // CREATE QUERY HASH
    function createQueryHash (filters) {
        if (!$.isEmptyObject(filters)) {
            window.location.hash = "#filters/" + JSON.stringify(filters);
        } else {
            window.location.hash = "#";
        }
    }

    function initEvents () {
        $("body").delegate(".close", "click", function (e) {
            e.preventDefault();
            createQueryHash(filters);
        });

        checkboxes.click(function () {
            var t = $(this),
                specName = t.attr("name");

            // When a checkbox is checked we need to write that in the filters object;
            if (t.is(":checked")) {
                // If the filter for this specification isn't created yet - do it.
                if (!(filters[specName] && filters[specName].length)) {
                    filters[specName] = [];
                }
                //  Push values into the chosen filter array
                filters[specName].push(t.val());
                // Change the url hash;
                createQueryHash(filters);
            }

            // When a checkbox is unchecked we need to remove its value from the filters object.
             if (!t.is(":checked")) {
                if (filters[specName] && filters[specName].length && (filters[specName].indexOf(t.val()) !== -1)) {
                    // Find the checkbox value in the corresponding array inside the filters object.
                    var index = filters[specName].indexOf(t.val());
                    // Remove it.
                    filters[specName].splice(index, 1);
                    // If it was the last remaining value for this specification,
                    // delete the whole array.
                    if (!filters[specName].length) {
                        delete filters[specName];
                    }
                }
                // Change the url hash;
                createQueryHash(filters);
            }
        });

        // When the "Clear all filters" button is pressed change the hash to '#' (go to the home page)
        $(".filters button").click(function (e) {
            e.preventDefault();
            window.location.hash = "#";
        });
    }

    // CONSTRUCT ALL PRODUCT HTML
    // USED ONLY FIRST TIME
    function generateAllProductsHTML (data) {
        var list = $(".all-products .products-list"),
            template = Handlebars.compile($("#products-template").html());

        list.append(template(data));
        list.delegate("li", "click", function (e) {
            e.preventDefault();

            var index = $(this).data("index");
            window.location.hash = "product/" + index;
        });
    }

    // RENDER ERROR
    function renderError () {
        var page = $(".error");

        page.addClass("visible");
    }


    // RENDER ALL PRODUCTS
    function renderProductsPage (products) {
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
    }

    // RENDER SINGLE PRODUCT
    function renderSingleProduct (index, products) {
        var page = $(".single-product"),
            c = $(".single-product .preview-large");

        products.forEach(function (product) {
            if (parseInt(product.id, 10) === parseInt(index, 10)) {
                c.find("h3").text(product.title);
                c.find("img").attr("src", "http://farm7.staticflickr.com/" + product.server + "/" + product.id + "_" + product.secret + "_z.jpg");
            }
        });
        page.addClass("visible");
    }

    // RENDER FILTERED PRODUCTS
    function renderFilteredProducts (filters, products) {
        var results = [];

        checkboxes.prop("checked", false);
        $.each(filters, function (index, filter) {
            products.forEach(function (product) {
                if (product[index] && filter.indexOf(product[index]) !== -1) {
                    $("input[name=" + index + "][value=" + product[index] + "]").prop("checked", true);
                    results.push(product);
                }
            });
        });
        renderProductsPage(results);
    }

    // Generic render
    function render (url) {
        $(".main-content .page").removeClass("visible");
        var section = url.split("/")[0],
            mapping = {
                "": function () {
                    filters = {};
                    renderProductsPage(products);
                },
                "#product": function () {
                    var index = url.split("#product/")[1].trim();

                    renderSingleProduct(index, products);
                },
                "#filters": function () {
                    try {
                        filters = JSON.parse(url.split("#filters/")[1]);
                    } catch (err) {
                        window.location.hash = "#";
                        return;
                    }
                    renderFilteredProducts(filters, products);
                }
            };

        if (mapping[section]) {
            mapping[section]();
        } else {
            renderError();
        }
    }

    $.getJSON("data/products.json", function (data) {
        products = data;
        initEvents();
        generateAllProductsHTML(data);
        // Manually trigger a hashchange to start the app.
        $(window).trigger("hashchange");
    });

    $(window).on("hashchange", function () {
        render(window.location.hash);
    });

});