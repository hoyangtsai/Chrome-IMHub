var React = require('react');

var Navbar = require('./Navbar');

var Home = React.createClass({
  getInitialState: function() {
    return {
      chatlink: 'https://www.messenger.com/login',
    };
  },

  changeRoom: function(link) {
    this.setState({
      chatlink: link.route
    });
  },

  _handleNewwindow(e) {
    e.stopImmediatePropagation();
    window.open(e.targetUrl);
  },

  _handlePermissionrequest(e) {
    if (e.permission === 'fullscreen' ||
        e.permission === 'download' ||
        e.permission === 'geolocation') {
      e.request.allow();
    }
  },

  componentDidMount: function() {
    this.refs.chatView.getDOMNode().addEventListener('newwindow', this._handleNewwindow);
    this.refs.chatView.getDOMNode().addEventListener('permissionrequest', this._handleNewwindow);
  },

  componentWillUnmount: function() {
    this.refs.chatView.getDOMNode().removeEventListener('newwindow', this._handleNewwindow);
    this.refs.chatView.getDOMNode().removeEventListener('permissionrequest', this._handleNewwindow);
  },

  render: function() {
    var styles = {
      webview: {
        position: 'absolute',
        width: '100%',
        height: 'calc(100% - 64px)',
      }
    };

    return (
      <section>
        <Navbar changeRoom={this.changeRoom} />
        <webview ref="chatView" style={styles.webview}
          src={this.state.chatlink} >
        </webview>
      </section>
    )
  }
});

module.exports = Home;