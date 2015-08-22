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
    if (e.permission === 'fullscreen' || e.permission === 'download' ||
        e.permission === 'geolocation' || e.permission === 'filesystem') {
      e.request.allow();
    }
  },

  componentDidMount: function() {
    window.addEventListener('newwindow', this._handleNewwindow);
    window.addEventListener('permissionrequest', this._handlePermissionrequest);
  },

  componentWillUnmount: function() {
    window.removeEventListener('newwindow', this._handleNewwindow);
    window.removeEventListener('permissionrequest', this._handlePermissionrequest);
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
      <div>
        <Navbar changeRoom={this.changeRoom} />
        <webview ref="chatView" style={styles.webview} src={this.state.chatlink} >
        </webview>
      </div>
    )
  }
});

module.exports = Home;