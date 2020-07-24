const http = require('http');
const url = require('url');
const fetch = require('node-fetch');
const nodeHtmlToImage = require('node-html-to-image');

http.createServer(async (req, res) => {
  const reqURL = url.parse(req.url, true);
  const query = reqURL.query;
  if (!query.username) {
    res.write(JSON.stringify({error: 'Add your medium username as query string'}));
    res.end();
    return;
  }
  const response = await fetch(`https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@${query.username}?t=${Date.now()}`);
  const responseJson = await response.json();
  if (!responseJson.items || responseJson.items.length === 0) {
    res.write(JSON.stringify({error: 'You dont have any medium article'}));
    res.end();
    return;
  }
  const lastArticle = responseJson.items[0];
  const articleDate = new Date(lastArticle.pubDate);
  const image = await nodeHtmlToImage({
    transparent: false,
    puppeteerArgs: { args: ["--no-sandbox", "--disable-setuid-sandbox"] },
    html: `
      <html>
        <body>
          <style>
            @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@300;400;700&display=swap');
            * {
              margin: 0;
              padding: 0;
            }
            body {
              width: 390px;
              height: 100px;
              font-family: 'Noto Sans JP', sans-serif;
            }
            #article-card {
              display: flex;
            }
            #article-thumbnail {
              width: 100px;
              height: 100px;
              flex-shrink: 0;
              margin-right: 25px;
            }
            #article-thumbnail img {
              width: 100%;
              height: 100%;
              object-fit: cover;
            }
            #article-info {
              display: flex;
              flex-direction: column;
              justify-content: space-between;
            }
            #article-title {
              font-size: 15px;
            }
            #article-publisher {
              display: block;
              font-size: 12px;
              font-weight: 400;
            }
            #article-date {
              display: block;
              font-size: 12px;
              font-weight: 300;
            }
          </style>
          <article id="article-card">
            <figure id="article-thumbnail">
              <img src="${lastArticle.thumbnail}" />
            </figure>
            <div id="article-info">
              <h1 id="article-title">${lastArticle.title}</h1>
              <div id="article-detail">
                <span id="article-publisher">${lastArticle.author}</span>
                <span id="article-date">${articleDate.toLocaleString('default', { month: 'short' })} ${articleDate.getDate()}</span>
              </div>
            </div>
          </article>
        </body>
      </html>
    `
  });
  res.writeHead(200, { 'Content-Type': 'image/png' });
  res.end(image, 'binary');
}).listen(process.env.PORT || 3000, function(){
 console.log("server start at port 3000");
});