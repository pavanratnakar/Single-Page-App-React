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
        // var categories = _.forEach(this.props.categories, function (category) {
        //     console.log(category);
        //     return (
        //         <label><input onClick={this.filterClickHandler} type="checkbox" name="category" value={category.name} />{category.title}</label>
        //     )
        // });
        return (
            <div className="filters">
                <form>
                    <div className="filter-criteria">
                        <span>Category</span>
                    </div>
                    <button onClick={this.resetClickHandler}>Clear filters</button>
                </form>
            </div>
        )
    }
});

module.exports = Filters;