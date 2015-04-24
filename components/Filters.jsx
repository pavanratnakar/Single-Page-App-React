var React = require('react');

// Export the ReactApp component
var Filters = React.createClass({
    render: function () {
        return (
            <div className="filters">
                <form>
                    <div className="filter-criteria">
                        <span>Category</span>
                        <label><input type="checkbox" name="category" value="nature" />Nature</label>
                        <label><input type="checkbox" name="category" value="people" />People</label>
                    </div>
                    <button>Clear filters</button>
                </form>
            </div>
        )
    }
});

module.exports = Filters;