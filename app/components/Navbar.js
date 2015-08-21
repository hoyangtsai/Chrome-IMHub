var React = require('react');

var mui = require('material-ui');
var ThemeManager = new mui.Styles.ThemeManager();
var { AppBar, LeftNav, MenuItem } = require('material-ui');

var Colors = mui.Styles.Colors;

var Navbar = React.createClass({
  getInitialState: function() {
    return {
      appbarStyle: {
        backgroundColor: '#0C84FB',
      },
    };
  },

  propTyeps: {
    changeRoom: React.PropTypes.func.isRequired
  },

  childContextTypes: {
    muiTheme: React.PropTypes.object
  },

  getChildContext() {
    return {
      muiTheme: ThemeManager.getCurrentTheme()
    };
  },

  _handleClick(e) {
    this.refs.leftNav.toggle();
  },

  _onLeftNavChange(e, key, payload) {
    switch(payload.text) {
      case 'Messenger':
        this.state.appbarStyle.backgroundColor = '#0C84FB';
        break;
      case 'Telegram':
        this.state.appbarStyle.backgroundColor = '#5D82A1';
        break;
      case 'Skype':
        this.state.appbarStyle.backgroundColor = '#40AFED';
        break;
      case 'Whatsapp':
        this.state.appbarStyle.backgroundColor = '#72CD55';
        break;
      case 'Hangouts':
        this.state.appbarStyle.backgroundColor = '#469557';
        break;
      default:
        this.state.appbarStyle.backgroundColor = '#4BB8D1';
        break;
    }

    this.props.changeRoom(payload);
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
      <main>
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
      </main>
    )
  }
});

module.exports = Navbar;