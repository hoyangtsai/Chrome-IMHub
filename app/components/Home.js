var React = require('react');

var Navbar = require('./Navbar');

var Home = React.createClass({
  getInitialState: function() {
    return {
      chatRoom: 'Messenger',
      chatLink: 'https://www.messenger.com/login',
      webviewStyle: {
        position: 'absolute',
        width: '100%',
        height: 'calc(100% - 64px)',
      },
    };
  },

  _handleRoomChange(payload) {
    this.setState({
      chatLink: payload.route,
      chatRoom: payload.text
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

  _handleWebviewLoaded(e) {
    this.refs.nav.changeAppbarStyle(this.state.chatRoom);
  },

  componentDidMount: function() {
    this.refs.chatView.getDOMNode().addEventListener('newwindow', this._handleNewwindow);
    this.refs.chatView.getDOMNode().addEventListener('permissionrequest', this._handlePermissionrequest);
    this.refs.chatView.getDOMNode().addEventListener('loadstop', this._handleWebviewLoaded);
  },

  componentWillUnmount: function() {
    this.refs.chatView.getDOMNode().removeEventListener('newwindow', this._handleNewwindow);
    this.refs.chatView.getDOMNode().removeEventListener('permissionrequest', this._handlePermissionrequest);
    this.refs.chatView.getDOMNode().removeEventListener('loadstop', this._handleWebviewLoaded);
  },

  render: function() {
    return (
      <div>
        <Navbar ref="nav"
          roomChange={this._handleRoomChange} />
        <webview ref="chatView"
          style={this.state.webviewStyle} src={this.state.chatLink}>
        </webview>
      </div>
    )
  }
});

module.exports = Home;