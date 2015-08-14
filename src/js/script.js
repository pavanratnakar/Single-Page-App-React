var React = require("react"),
    App = require("../../components/App.jsx");

var products = JSON.parse(document.getElementById("initial-state").innerHTML);

// Render the components, picking up where react left off on the server
React.render(
    <App products={products} />,
    document.getElementById("react-app")
);
