var React = require('react'),
    Products = require('./Products.jsx'),
    Overlay = require('./Overlay.jsx');
    Error = require('./Error.jsx');

// Export the ReactApp component
var ReactApp = React.createClass({

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
    componentDidMount: function () {
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