var React = require('react');

var Navbar = require('./Navbar');
var helpers = require('../utils/helpers');

var Home = React.createClass({
  getInitialState: function() {
    return {
      chatName: 'Messenger',
      chatSrc: 'https://www.messenger.com/login',
      weatherForecasted: false,
    };
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

  _handleContentload(e) {
    if (!this.state.weatherForecasted) {
      navigator.geolocation.getCurrentPosition(this._forecastWeather);
      this.setState({weatherForecasted: true});
    }
  },

  _createChatRoom(payload) {
    var webview = document.createElement('webview');
    webview.setAttribute('id', payload.text);
    webview.setAttribute('src', payload.route);
    webview.addEventListener('newwindow', this._handleNewwindow);
    webview.addEventListener('permissionrequest', this._handlePermissionrequest);
    webview.addEventListener('contentload', this._handleContentload);
    return webview;
  },

  _handleRoomChange(payload) {
    var currentChat = document.getElementById(this.state.chatName);
    if (document.getElementById(payload.text)) {
      currentChat.style.display = 'none';
      var prevChat = document.getElementById(payload.text);
      prevChat.style.display = '';
    } else {
      var newChat = this._createChatRoom(payload);
      this.refs.chatDiv.getDOMNode().appendChild(newChat);
      currentChat.style.display = 'none';
    }
    this.setState({chatName: payload.text});
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

  componentDidMount: function() {
    var messneger = document.getElementById('Messenger');
    messneger.addEventListener('newwindow', this._handleNewwindow);
    messneger.addEventListener('permissionrequest', this._handlePermissionrequest);
    messneger.addEventListener('contentload', this._handleContentload);

    chrome.notifications.clear('IMHubWeatherForecast');
  },

  render: function() {
    return (
      <div>
        <Navbar ref="nav"
          roomChange={this._handleRoomChange} />
        <div ref="chatDiv" id="chatDiv">
          <webview id="Messenger" src={this.state.chatSrc} />
        </div>
      </div>
    );
  }
});

module.exports = Home;