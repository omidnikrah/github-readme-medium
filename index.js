const http = require('http');
const url = require('url');
const fetch = require('node-fetch');
const ArticleCard = require('./src/ArticleCard');
const { asyncForEach } = require('./src/utils');

http.createServer(async (req, res) => {
  const reqURL = url.parse(req.url, true);
  const { username, limit } = reqURL.query;
  const timestamp = Math.floor(Date.now() / 1000);
  let articles = [];

  if (!username) {
    res.write(JSON.stringify({error: 'Add your medium username as query string'}));
    res.end();
    return;
  }

  const response = await fetch(`https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@${username}?t=${timestamp}`);
  const responseJson = await response.json();

  if (!responseJson.items || responseJson.items.length === 0) {
    res.write(JSON.stringify({error: 'You dont have any medium article'}));
    res.end();
    return;
  }

  if (limit) {
    articles = [...responseJson.items.slice(0, limit)];
  } else {
    articles = [responseJson.items[0]];
  }

  let result = '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="390px" version="1.2">';

  await asyncForEach(articles, async (article, index) => {
    const articleCard = await ArticleCard(article);
    result += `<g transform="translate(0, ${index * 120})">${articleCard}</g>`;
  });

  result += `</svg>`;

  res.setHeader('Cache-Control', 'private, no-cache, no-store, must-revalidate');
  res.setHeader('Expires', '-1');
  res.setHeader('Pragma', 'no-cache');
  res.writeHead(200, { 'Content-Type': 'image/svg+xml' });

  res.write(result);
  res.end();
}).listen(process.env.PORT || 3000, function(){
 console.log("server start at port 3000");
});