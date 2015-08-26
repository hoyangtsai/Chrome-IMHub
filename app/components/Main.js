var React = require('react');
var RouteHandler = require('react-router').RouteHandler;

var Main = React.createClass({
  render: function(){
    return (
      <main>
        <RouteHandler />
      </main>
    )
  }
});

module.exports = Main;