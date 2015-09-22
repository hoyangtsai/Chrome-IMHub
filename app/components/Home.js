var React = require('react');

var Navbar = require('./Navbar');
var helpers = require('../utils/helpers');

var Home = React.createClass({
  getInitialState: function() {
    return {
      chatRoom: 'Messenger',
      chatLink: 'https://www.messenger.com/login',
      chatViewStyle: {
        position: 'absolute',
        width: '100%',
        height: 'calc(100% - 64px)',
      },
      weatherForecasted: true,
      showRoomStyle: 'position: absolute; width: 100%; height: calc(100% - 64px);',
      hideRoomStyle: 'display: none;'
    };
  },

  _handleRoomChange(payload) {
    var currentChat = document.getElementById(this.state.chatRoom);
    if (document.getElementById(payload.text)) {
      currentChat.style.display = 'none';
      var prevChat = document.getElementById(payload.text);
      prevChat.style.display = '';
    } else {
      var newChat = this._createChatRoom(payload.route, payload.text);
      this.refs.chatDiv.getDOMNode().appendChild(newChat);
      currentChat.style.display = 'none';
    }
    this.setState({chatRoom : payload.text});
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
    if (!this.state.weatherForecasted) {
      navigator.geolocation.getCurrentPosition(this._forecastWeather);
      this.setState({weatherForecasted: true});
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
        chrome.notifications.create('IMHubWeatherForecast', opt);
      }.bind(this));
  },

  _createChatRoom(url, app){
    var webview = document.createElement('webview');
    webview.src = url;
    webview.setAttribute('id', app);
    webview.setAttribute('style', this.state.showRoomStyle);
    return webview;
  },

  componentDidMount: function() {
    window.addEventListener('newwindow', this._handleNewwindow);
    window.addEventListener('permissionrequest', this._handlePermissionrequest);
    window.addEventListener('loadstop', this._handleWebviewLoaded);

    chrome.notifications.clear('IMHubWeatherForecast');
    this.setState({weatherForecasted: false});
  },

  componentWillUnmount: function() {
    window.removeEventListener('newwindow', this._handleNewwindow);
    window.removeEventListener('permissionrequest', this._handlePermissionrequest);
    window.removeEventListener('loadstop', this._handleWebviewLoaded);
  },

  render: function() {
    return (
      <div ref="chatDiv">
        <Navbar ref="nav"
          roomChange={this._handleRoomChange} />
        <webview id="Messenger"
          style={this.state.chatViewStyle} src={this.state.chatLink}>
        </webview>
      </div>
    )
  }
});

module.exports = Home;