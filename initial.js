/** @jsx React.DOM */
/* eslint-env */

var React = require("react");
var ReactApp = require("./components/App.react");

// Snag the initial state that was passed from the server side
var initialState = JSON.parse(document.getElementById("initial-state").innerHTML)

// Render the components, picking up where react left off on the server
React.renderComponent(
	<ReactApp tweets={initialState}/>,
	document.getElementById("react-app")
);