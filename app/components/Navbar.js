var React = require('react');

var mui = require('material-ui');
var ThemeManager = new mui.Styles.ThemeManager();
var { AppBar, LeftNav, MenuItem, FlatButton } = mui;

var Navbar = React.createClass({
  propTyeps: {
    roomChange: React.PropTypes.func.isRequired
  },

  childContextTypes: {
    muiTheme: React.PropTypes.object
  },

  getChildContext() {
    return {
      muiTheme: ThemeManager.getCurrentTheme()
    };
  },

  getInitialState: function() {
    return {
      appbarStyle: {
        backgroundColor: '#565656',
      },
    };
  },

  _handleClick(e) {
    this.refs.leftNav.toggle();
  },

  _onLeftNavChange(e, key, payload) {
    this.props.roomChange(payload);
  },

  _handelKeepButton(e) {
    // iconElementRight={<FlatButton label="Keep" onClick={this._handelKeepButton} />}
    console.log('keep clicked');
  },

  render: function() {
    var menuItems = [
      { type: MenuItem.Types.SUBHEADER, text: 'Where to go' },
      { text: 'Messenger', route: 'https://www.messenger.com/login' },
      { text: 'Telegram', route: 'https://web.telegram.org/' },
      { text: 'Skype', route: 'https://web.skype.com/' },
      { text: 'Whatsapp', route: 'https://web.whatsapp.com/' },
      { text: 'Hangouts', route: 'https://accounts.google.com/ServiceLogin?service=talk&continue=https://hangouts.google.com/' },
      { text: 'WeChat', route: 'https://web.wechat.com/' }
    ];
    return (
      <nav>
        <AppBar title='IM Hub'
          onLeftIconButtonTouchTap={this._handleClick}
          showMenuIconButton={true}
          style={this.state.appbarStyle} />
        <LeftNav
          ref="leftNav"
          docked={false}
          menuItems={menuItems}
          onChange={this._onLeftNavChange} />
      </nav>
    )
  }
});

module.exports = Navbar;