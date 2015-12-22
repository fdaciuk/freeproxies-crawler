'use strict';

let cheerio = require('cheerio');
let spawn = require('child_process').spawn;
let url = 'http://www.freeproxylists.net/?c=&pt=&pr=&a%5B%5D=0&a%5B%5D=1&a%5B%5D=2&u=90';
let phantom = spawn('phantomjs', ['phantom.js', url]);
let finalData = [];

phantom.stdout.on('data', data => {
  finalData.push(data);
});

phantom.on('close', () => {
  finalData = Buffer.concat(finalData);
  finalData = JSON.parse(finalData);

  let $ = cheerio.load(finalData.html);
  let $tr = $('.DataGrid tr:not(:first-child)');

  $tr.each((index, item) => {
    let $actualTr = $(item);
    let proxy = $actualTr.find('a').text();
    let port = $actualTr.find('td:first-child + td').text();
    if(proxy && port)
      console.log(`${proxy}:${port}`);
  });
});

