"use strict";

var React = require("react");

// Export the ReactApp component
var Overlay = React.createClass({

    closeClickHandler: function (e) {
        e.preventDefault();
        this.props.onClose();
    },

    render: function () {
        return (
            <div className="single-product page">
                <div className="overlay"></div>
                <div className="preview-large">
                    <h3>Single product view</h3>
                    <img src=""/>
                    <span className="close" onClick={this.closeClickHandler}>×</span>
                </div>
            </div>
        );
    }
});

module.exports = Overlay;
