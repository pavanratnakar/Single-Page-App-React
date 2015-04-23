/** @jsx React.DOM */
/*eslint-env node, mocha */

var React = require("react");

// Export the ReactApp component
module.exports = ReactApp = React.createClass({

    // Set the initial component state
    getInitialState: function (props) {
        props = props || this.props;

        // Set initial application state using props
        return {};

    },

    componentWillReceiveProps: function (newProps, oldProps) {
        this.setState(this.getInitialState(newProps));
    },

    // Called directly after component rendering, only on client
    componentDidMount: function () {},

    // Render the component
    render: function () {

        return 
    }

});