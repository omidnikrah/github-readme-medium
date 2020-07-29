const { readingTimeCalc, imgToDataURL } = require('./utils');

const ArticleCard = async (data) => {
  const thumbnailBase64 = await imgToDataURL(data.thumbnail);
  const articleDate = new Date(data.pubDate);
  const readingTime = readingTimeCalc(data.content);
  
  return `
    <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="390px" height="100px" version="1.2" baseProfile="tiny" style="margin: 10px">
      <g fill="none" stroke="black" stroke-width="1" fill-rule="evenodd" stroke-linecap="square" stroke-linejoin="bevel">
      
        <g fill="#000000" fill-opacity="1" stroke="#000000" stroke-opacity="1" stroke-width="1" stroke-linecap="square" stroke-linejoin="miter" stroke-miterlimit="2" transform="matrix(1,0,0,1,0,0)">
        </g>
        
        <g fill="#000000" fill-opacity="1" stroke="#000000" stroke-opacity="1" stroke-width="1" stroke-linecap="square" stroke-linejoin="miter" stroke-miterlimit="2" transform="matrix(1,0,0,1,0,0)">
        </g>
        
        <g fill="#000000" fill-opacity="1" stroke="#000000" stroke-opacity="1" stroke-width="1" stroke-linecap="square" stroke-linejoin="miter" stroke-miterlimit="2" transform="matrix(1,0,0,1,0,0)">
          <image x="0" y="0" width="100" height="100" preserveAspectRatio="xMidYMid slice" xlink:href="${thumbnailBase64}"/>
        </g>
        
        <g fill="#000000" fill-opacity="1" stroke="#000000" stroke-opacity="1" stroke-width="1" stroke-linecap="square" stroke-linejoin="bevel" transform="matrix(1,0,0,1,0,0)">
        <text fill="#000000" fill-opacity="1" stroke="none" xml:space="preserve" x="125" y="14" font-family="Arial" font-size="15" font-weight="700" font-style="normal">${data.title}</text>
        </g>

        <g fill="#000000" fill-opacity="1" stroke="#000000" stroke-opacity="1" stroke-width="1" stroke-linecap="square" stroke-linejoin="bevel" transform="matrix(1,0,0,1,0,0)">
        <text fill="#000000" fill-opacity="1" stroke="none" xml:space="preserve" x="125" y="82" font-family="Arial" font-size="12" font-weight="400" font-style="normal">${data.author}</text>
        </g>
        
        <g fill="#000000" fill-opacity="1" stroke="#000000" stroke-opacity="1" stroke-width="1" stroke-linecap="square" stroke-linejoin="bevel" transform="matrix(1,0,0,1,0,0)">
        <text fill="#000000" fill-opacity="1" stroke="none" xml:space="preserve" x="125" y="97" font-family="Arial" font-size="12" font-weight="400" font-style="normal">${articleDate.toLocaleString('default', { month: 'short' })} ${articleDate.getDate()} · ${readingTime}</text>
        </g>
        
        <g fill="#000000" fill-opacity="1" stroke="#000000" stroke-opacity="1" stroke-width="1" stroke-linecap="square" stroke-linejoin="miter" stroke-miterlimit="2" transform="matrix(1,0,0,1,0,0)">
        </g>
        
        <g fill="#000000" fill-opacity="1" stroke="#000000" stroke-opacity="1" stroke-width="1" stroke-linecap="square" stroke-linejoin="miter" stroke-miterlimit="2" transform="matrix(1,0,0,1,0,0)">
        </g>
        
        <g fill="#000000" fill-opacity="1" stroke="#000000" stroke-opacity="1" stroke-width="1" stroke-linecap="square" stroke-linejoin="miter" stroke-miterlimit="2" transform="matrix(1,0,0,1,0,0)">
        </g>
      </g>
    </svg>
  `;
};

module.exports = ArticleCard;