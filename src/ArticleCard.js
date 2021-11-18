const { readingTimeCalc, imgToDataURL } = require('./utils');

const ArticleCard = async (data, colors) => {
  const thumbnailBase64 = await imgToDataURL(data.thumbnail);
  const articleDate = new Date(data.pubDate);
  const readingTime = readingTimeCalc(data.content);
  const re = /[0-9A-Fa-f]{6}/g; //hex code format 
  let hexBg = null;
  let hexText = null;
  if (re.test(colors.bg)) {        //converted to hex format 
    hexBg = `#${colors.bg}`
  }
  if (re.test(colors.text)) {
    hexText = `#${colors.text}`
  }

  return `
  <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="390px" height="100px" version="1.2" baseProfile="tiny" style="margin: 10px">
    <rect width="100%" height="100%" fill="${hexBg ? hexBg : colors.bg}" style="padding:10px;"/>
      <g fill="none" stroke="black" stroke-width="1" fill-rule="evenodd" stroke-linecap="square" stroke-linejoin="bevel">
      
        <g fill="#000000" fill-opacity="1" stroke="#000000" stroke-opacity="1" stroke-width="1" stroke-linecap="square" stroke-linejoin="miter" stroke-miterlimit="2" transform="matrix(1,0,0,1,0,0)">
        </g>
        
        <g fill="#000000" fill-opacity="1" stroke="#000000" stroke-opacity="1" stroke-width="1" stroke-linecap="square" stroke-linejoin="miter" stroke-miterlimit="2" transform="matrix(1,0,0,1,0,0)">
        </g>
        
        <g fill="#000000" fill-opacity="1" stroke="#000000" stroke-opacity="1" stroke-width="1" stroke-linecap="square" stroke-linejoin="miter" stroke-miterlimit="2" transform="matrix(1,0,0,1,0,0)">
          <image x="0" y="0" width="100" height="100" preserveAspectRatio="xMidYMid slice" xlink:href="${thumbnailBase64}"/>
        </g>
        
        <g fill="#000000" fill-opacity="1" stroke="#000000" stroke-opacity="1" stroke-width="1" stroke-linecap="square" stroke-linejoin="bevel" transform="matrix(1,0,0,1,0,0)">
        
          <text fill="${hexText ? hexText : colors.text}" fill-opacity="1" stroke="none" xml:space="preserve" x="110" y="20" font-family="Arial" font-size="15" font-weight="700" font-style="normal" >${data.title.replace(/&(?!#?[a-z0-9]+;)/g, '&amp;')}</text>
          </g>

        <g fill="#000000" fill-opacity="1" stroke="#000000" stroke-opacity="1" stroke-width="1" stroke-linecap="square" stroke-linejoin="bevel" transform="matrix(1,0,0,1,0,0)">
        <text fill="${hexText ? hexText : colors.text}" fill-opacity="1" stroke="none" xml:space="preserve" x="110" y="60" font-family="Arial" font-size="12" font-weight="400" font-style="normal">${data.author}</text>
        </g>
        
        <g fill="#000000" fill-opacity="1" stroke="#000000" stroke-opacity="1" stroke-width="1" stroke-linecap="square" stroke-linejoin="bevel" transform="matrix(1,0,0,1,0,0)">
        <text fill="${hexText ? hexText : colors.text}" fill-opacity="1" stroke="none" xml:space="preserve" x="110" y="87" font-family="Arial" font-size="12" font-weight="400" font-style="normal">${articleDate.toLocaleString('default', { month: 'short' })} ${articleDate.getDate()} · ${readingTime}</text>
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
