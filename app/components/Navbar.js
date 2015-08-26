var React = require('react');

var mui = require('material-ui');
var ThemeManager = new mui.Styles.ThemeManager();
var { AppBar, LeftNav, MenuItem } = require('material-ui');

var Navbar = React.createClass({
  propTyeps: {
    roomChange: React.PropTypes.func.isRequired
  },

  getInitialState: function() {
    return {
      appbarStyle: {
        backgroundColor: '#0C84FB',
      },
    };
  },

  childContextTypes: {
    muiTheme: React.PropTypes.object
  },

  getChildContext() {
    return {
      muiTheme: ThemeManager.getCurrentTheme()
    };
  },

  changeAppbarStyle(chatRoom) {
    switch(chatRoom) {
      case 'Messenger':
        this.setState({
          appbarStyle: {
            backgroundColor: '#0C84FB',
          }
        });
        break;
      case 'Telegram':
        this.setState({
          appbarStyle: {
            backgroundColor: '#5D82A1',
          }
        });
        break;
      case 'Skype':
        this.setState({
          appbarStyle: {
            backgroundColor: '#40AFED',
          }
        });
        break;
      case 'Whatsapp':
        this.setState({
          appbarStyle: {
            backgroundColor: '#72CD55',
          }
        });
        break;
      case 'Hangouts':
        this.setState({
          appbarStyle: {
            backgroundColor: '#469557',
          }
        });
        break;
      default:
        this.setState({
          appbarStyle: {
            backgroundColor: '#4BB8D1',
          }
        });
        break;
    }
  },

  _handleClick(e) {
    this.refs.leftNav.toggle();
  },

  _onLeftNavChange(e, key, payload) {
    this.props.roomChange(payload);
  },

  render: function() {
    var menuItems = [
      { type: MenuItem.Types.SUBHEADER, text: 'Where to go' },
      { route: 'https://www.messenger.com/login', text: 'Messenger' },
      { route: 'https://hoyangt.github.io/webogram/', text: 'Telegram' },
      { route: 'https://web.skype.com/', text: 'Skype' },
      { route: 'https://web.whatsapp.com/', text: 'Whatsapp' },
      { route: 'https://accounts.google.com/ServiceLogin?service=talk&passive=1209600&continue=https://hangouts.google.com/&followup=https://hangouts.google.com/', text: 'Hangouts' },
    ];
    return (
      <nav>
        <AppBar title='IM Hub'
          onLeftIconButtonTouchTap={this._handleClick}
          showMenuIconButton={true}
          isInitiallyOpen={true}
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