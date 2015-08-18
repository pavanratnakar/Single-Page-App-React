"use strict";

var React = require("react");

// Export the ReactApp component
var Filters = React.createClass({

    filterClickHandler: function (e) {
        var node = $(e.currentTarget);

        this.props.filterChange(node.attr("name"), node.is(":checked"), node.val());
    },

    resetClickHandler: function (e) {
        e.preventDefault();

        this.props.filterReset();
    },

    render: function () {
        var t = this;

        var categories = t.props.categories.map(function (category, index) {
            var inputProps = {
                name: 'category',
                type: 'checkbox',
                value: category.name
            };
            if (category.value) {
                inputProps.checked = 'checked';
            }
            return (
                <label key={"label" + index}>
                    <input onChange={t.filterClickHandler} {...inputProps} />
                    {category.title}
                </label>
            );
        });
        return (
            <div className="filters">
                <form>
                    <div className="filter-criteria">
                        <span>Category</span>
                        {categories}
                    </div>
                    <button onClick={t.resetClickHandler}>Clear filters</button>
                </form>
            </div>
        );
    }
});

module.exports = Filters;
