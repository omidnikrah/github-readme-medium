const http = require('http');
const url = require('url');
const ArticleCard = require('./src/ArticleCard');
const { userArticles } = require('./src/mediumAPI');
const { asyncForEach } = require('./src/utils');

http.createServer(async (req, res) => {
  const reqURL = url.parse(req.url, true);
  const { username, limit, bg, text } = reqURL.query;
  const colors = { bg: bg, text: text }
  const timestamp = Math.floor(Date.now() / 1000);
  let articles = [];

  if (!username) {
    res.write(JSON.stringify({ error: 'Add your medium username as query string' }));
    res.end();

    return;
  }
  const {articles: responseArticles, profileImgUrl} = await userArticles(`${username}?t=${timestamp}`);

  if (!responseArticles || responseArticles.length === 0) {

    res.write(JSON.stringify({ error: 'You dont have any medium article' }));
    res.end();
    return;
  }

  if (!colors.bg) {
    colors.bg = '22272e'
  }
  if (!colors.text) {
    colors.text = 'white'
  }

  if (limit) {
    articles = [...responseArticles.slice(0, limit)];
  } else {

    articles = [responseArticles[0]];
  }

  let result = `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="390px" version="1.2" height="${articles.length * 120}">`;

  await asyncForEach(articles, async (article, index) => {
    const articleCard = await ArticleCard(article, colors,profileImgUrl);
    result += `<g transform="translate(0, ${index * 120})">${articleCard}</g>`;
  });

  result += `</svg>`;

  res.setHeader('Cache-Control', 'private, no-cache, no-store, must-revalidate');
  res.setHeader('Expires', '-1');
  res.setHeader('Pragma', 'no-cache');
  res.writeHead(200, { 'Content-Type': 'image/svg+xml' });

  res.write(result);
  res.end();
}).listen(process.env.PORT || 3000, function () {
  console.log("server start at port 3000");
});