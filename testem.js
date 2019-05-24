module.exports = {
  'test_page': 'tests/index.html',
  'framework': 'mocha',
  'launch_in_ci': [
    'Chrome',
  ],
  'launch_in_dev': [
    'Chrome',
  ],
  'browser_args': {
    'Chrome': [
      '--disable-gpu',
      '--disable-web-security',
      '--incognito',
      '--no-sandbox',
      '--remote-debugging-address=0.0.0.0',
      '--remote-debugging-port=9222',
    ],
  }
};
