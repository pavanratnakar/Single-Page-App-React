var React = require('react');

// Export the ReactApp component
var Error = React.createClass({
    render: function () {
        return (
            <div className="error page">
                <h3>Sorry, something went wrong :(</h3>
            </div>
        )
    }
});

module.exports = Error;