chrome.app.runtime.onLaunched.addListener(function() {
  chrome.app.window.create('default.html', {
    'bounds': {
      'width': 1152,
      'height': 720
    }
  });
});