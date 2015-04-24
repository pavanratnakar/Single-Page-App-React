var React = require('react');

// Export the ReactApp component
var Overlay = React.createClass({
    render: function () {
        return (
            <div className="single-product page">
                <div className="overlay"></div>
                <div className="preview-large">
                    <h3>Single product view</h3>
                    <img src=""/>
                    <span className="close">×</span>
                </div>
            </div>
        )
    }
});

module.exports = Overlay;