"use strict";

var React = require("react");

// Export the ReactApp component
var ErrorComponent = React.createClass({
    render: function () {
        return (
            <div className="error page">
                <h3>Sorry, something went wrong :(</h3>
            </div>
        );
    }
});

module.exports = ErrorComponent;
