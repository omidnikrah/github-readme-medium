const http = require('http');
const url = require('url');
const fetch = require('node-fetch');
const nodeHtmlToImage = require('node-html-to-image');

const toDataURL = url => {
  return fetch(url).then(r => r.buffer()).then(buf => `data:image/png;base64,`+buf.toString('base64'));
};

http.createServer(async (req, res) => {
  const reqURL = url.parse(req.url, true);
  const query = reqURL.query;
  const timestamp = Math.floor(Date.now() / 1000);
  if (!query.username) {
    res.write(JSON.stringify({error: 'Add your medium username as query string'}));
    res.end();
    return;
  }
  const response = await fetch(`https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@${query.username}?t=${timestamp}`);
  const responseJson = await response.json();
  if (!responseJson.items || responseJson.items.length === 0) {
    res.write(JSON.stringify({error: 'You dont have any medium article'}));
    res.end();
    return;
  }
  const lastArticle = responseJson.items[0];
  const thumbnailBase64 = await toDataURL(lastArticle.thumbnail);
  const articleDate = new Date(lastArticle.pubDate);
  // const image = await nodeHtmlToImage({
  //   transparent: false,
  //   puppeteerArgs: { args: ["--no-sandbox", "--disable-setuid-sandbox"] },
  //   enconding: 'base64',
  //   html: `
  //     <html>
  //       <body>
  //         <style>
  //           @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@300;400;700&display=swap');
  //           * {
  //             margin: 0;
  //             padding: 0;
  //           }
  //           body {
  //             width: 390px;
  //             height: 100px;
  //             font-family: 'Noto Sans JP', sans-serif;
  //           }
  //           #article-card {
  //             display: flex;
  //           }
  //           #article-thumbnail {
  //             width: 100px;
  //             height: 100px;
  //             flex-shrink: 0;
  //             margin-right: 25px;
  //           }
  //           #article-thumbnail img {
  //             width: 100%;
  //             height: 100%;
  //             object-fit: cover;
  //           }
  //           #article-info {
  //             display: flex;
  //             flex-direction: column;
  //             justify-content: space-between;
  //           }
  //           #article-title {
  //             font-size: 15px;
  //           }
  //           #article-publisher {
  //             display: block;
  //             font-size: 12px;
  //             font-weight: 400;
  //           }
  //           #article-date {
  //             display: block;
  //             font-size: 12px;
  //             font-weight: 300;
  //           }
  //         </style>
  //         <article id="article-card">
  //           <figure id="article-thumbnail">
  //             <img src="${lastArticle.thumbnail}" />
  //           </figure>
  //           <div id="article-info">
  //             <h1 id="article-title">${lastArticle.title}</h1>
  //             <div id="article-detail">
  //               <span id="article-publisher">${lastArticle.author}</span>
  //               <span id="article-date">${articleDate.toLocaleString('default', { month: 'short' })} ${articleDate.getDate()}</span>
  //             </div>
  //           </div>
  //         </article>
  //       </body>
  //     </html>
  //   `
  // });
  res.setHeader('Cache-Control', 'private, no-cache, no-store, must-revalidate');
  res.setHeader('Expires', '-1');
  res.setHeader('Pragma', 'no-cache');
  res.writeHead(200, { 'Content-Type': 'image/svg+xml' });
  // res.end(image, 'base64');
  res.write(`
  <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="317.5mm" height="26.4583mm" version="1.2" baseProfile="tiny">
    <g fill="none" stroke="black" stroke-width="1" fill-rule="evenodd" stroke-linecap="square" stroke-linejoin="bevel">
    
    <g fill="#000000" fill-opacity="1" stroke="#000000" stroke-opacity="1" stroke-width="1" stroke-linecap="square" stroke-linejoin="miter" stroke-miterlimit="2" transform="matrix(1,0,0,1,0,0)">
    </g>
    
    <g fill="#000000" fill-opacity="1" stroke="#000000" stroke-opacity="1" stroke-width="1" stroke-linecap="square" stroke-linejoin="miter" stroke-miterlimit="2" transform="matrix(1,0,0,1,0,0)">
    </g>
    
    <g fill="#000000" fill-opacity="1" stroke="#000000" stroke-opacity="1" stroke-width="1" stroke-linecap="square" stroke-linejoin="miter" stroke-miterlimit="2" transform="matrix(1,0,0,1,0,0)">
      <image x="0" y="0" width="100" height="100" preserveAspectRatio="xMidYMid slice" xlink:href="${thumbnailBase64}"/>
    </g>
    
    <g fill="#000000" fill-opacity="1" stroke="#000000" stroke-opacity="1" stroke-width="1" stroke-linecap="square" stroke-linejoin="bevel" transform="matrix(1,0,0,1,0,0)">
    <text fill="#000000" fill-opacity="1" stroke="none" xml:space="preserve" x="125" y="14" font-family="Arial" font-size="15" font-weight="700" font-style="normal">${lastArticle.title}</text>
    </g>

    <g fill="#000000" fill-opacity="1" stroke="#000000" stroke-opacity="1" stroke-width="1" stroke-linecap="square" stroke-linejoin="bevel" transform="matrix(1,0,0,1,0,0)">
    <text fill="#000000" fill-opacity="1" stroke="none" xml:space="preserve" x="125" y="82" font-family="Arial" font-size="12" font-weight="400" font-style="normal">${lastArticle.author}</text>
    </g>
    
    <g fill="#000000" fill-opacity="1" stroke="#000000" stroke-opacity="1" stroke-width="1" stroke-linecap="square" stroke-linejoin="bevel" transform="matrix(1,0,0,1,0,0)">
    <text fill="#000000" fill-opacity="1" stroke="none" xml:space="preserve" x="125" y="97" font-family="Arial" font-size="12" font-weight="400" font-style="normal">${articleDate.toLocaleString('default', { month: 'short' })} ${articleDate.getDate()}</text>
    </g>
    
    <g fill="#000000" fill-opacity="1" stroke="#000000" stroke-opacity="1" stroke-width="1" stroke-linecap="square" stroke-linejoin="miter" stroke-miterlimit="2" transform="matrix(1,0,0,1,0,0)">
    </g>
    
    <g fill="#000000" fill-opacity="1" stroke="#000000" stroke-opacity="1" stroke-width="1" stroke-linecap="square" stroke-linejoin="miter" stroke-miterlimit="2" transform="matrix(1,0,0,1,0,0)">
    </g>
    
    <g fill="#000000" fill-opacity="1" stroke="#000000" stroke-opacity="1" stroke-width="1" stroke-linecap="square" stroke-linejoin="miter" stroke-miterlimit="2" transform="matrix(1,0,0,1,0,0)">
    </g>
    </g>
    </svg>
  `);
  res.end();
}).listen(process.env.PORT || 3000, function(){
 console.log("server start at port 3000");
});