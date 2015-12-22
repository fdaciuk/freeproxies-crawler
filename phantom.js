'use strict';

var system = require('system');
var page = require('webpage').create();
var address = system.args[1];
var exportedData;

if(system.args.length === 1) {
  exportedData = { error: 'Usage: phantomjs phantom.js <some URL>' };
  system.stderr.write(JSON.stringify(exportedData));
  phantom.exit();
}

page.open(address, function(status) {
  if(status !== 'success') {
    exportedData = { error: 'Fail to load the address ' + address };
    system.stderr.write(JSON.stringify(exportedData));
    return phantom.exit();
  }
  var title = page.evaluate(function() {
    return document.title;
  });
  exportedData = { html: page.content, title: title, url: address };
  system.stdout.write(JSON.stringify(exportedData));
  phantom.exit();
});

