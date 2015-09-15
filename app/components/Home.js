var React = require('react');

var Navbar = require('./Navbar');
var helpers = require('../utils/helpers');

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
      forecastOpt: true
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

    if (!this.state.forecastOpt) {
      navigator.geolocation.getCurrentPosition(this._forecastWeather);
      this.setState({forecastOpt: true});
    }
  },

  _forecastWeather(position) {
    var location = {
      lat: position.coords.latitude,
      lon: position.coords.longitude
    };

    helpers.getWeatherForecast(location)
      .then(function(response){
        var forecast = response.data.forecast;
        this._showWetherNotification(forecast);
      }.bind(this));
  },

  _showWetherNotification(forecast){
    var forecastday = forecast.txt_forecast.forecastday;

    var hours = new Date().getHours();
    var time = 0;
    if (hours >= 16 && hours <= 21) {
      time = 1;
    } else if(hours >= 22){
      time = 2;
    }

    var optTitle = forecastday[time].title,
        optMessage = forecastday[time].fcttext_metric,
        optIcon = forecastday[time].icon_url;

    helpers.getArrayBuffer(optIcon)
      .then(function(response){
        var iconBase64 = helpers.convertBase64(response.data);

        var opt = {
          type: 'basic',
          title: optTitle,
          message: optMessage,
          iconUrl: iconBase64
        };
        chrome.notifications.create('forecast', opt);
      }.bind(this));
  },

  componentDidMount: function() {
    this.refs.chatView.getDOMNode().addEventListener('newwindow', this._handleNewwindow);
    this.refs.chatView.getDOMNode().addEventListener('permissionrequest', this._handlePermissionrequest);
    this.refs.chatView.getDOMNode().addEventListener('loadstop', this._handleWebviewLoaded);

    this.setState({forecastOpt: false});
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