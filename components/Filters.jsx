var React = require('react');

// Export the ReactApp component
var Filters = React.createClass({

    filterClickHandler: function (e) {
        e.preventDefault();
        var node = $(e.currentTarget);

        this.props.filterChange(node.attr("name"), node.is(":checked"), node.val());
    },

    resetClickHandler: function (e) {
        e.preventDefault();

        this.props.filterReset();
    },

    render: function () {
        var t = this,
            checked;

        var categories = t.props.categories.map(function (category, index) {
            checked = category.value;
            return (
                <label><input onClick={t.filterClickHandler} type="checkbox" name="category" value={category.name} checked={checked} />{category.title}</label>
            )
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
        )
    }
});

module.exports = Filters;