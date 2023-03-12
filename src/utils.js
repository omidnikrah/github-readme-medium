const axios = require('axios');
const sharp = require('sharp');

const ansiWordBound = (c) => (
  (' ' === c) ||
  ('\n' === c) ||
  ('\r' === c) ||
  ('\t' === c)
);

const readingTimeCalc = (text) => {
  let words = 0;
  let start = 0;
  let end = text.length - 1;
  let i;

  const wordsPerMinute = 200;

  while (ansiWordBound(text[start])) start++
  while (ansiWordBound(text[end])) end--

  for (i = start; i <= end;) {
    for (; i <= end && !ansiWordBound(text[i]); i++) ;
    words++
    for (; i <= end && ansiWordBound(text[i]); i++) ;
  }

  const minutes = words / wordsPerMinute;
  const displayed = Math.ceil(minutes.toFixed(2));

  return `${displayed} min read`;
}

const imgToDataURL = async (url,placeHolder) => {
  async function processImage(url) {
    let {data} = await axios.get(url, { responseType: 'arraybuffer' });
    let sharpedData = await sharp(data).resize(200).toBuffer();
    return `data:image/png;base64,${sharpedData.toString('base64')}`
  }
  try{
    return await  processImage(url);
  }catch(e){
    try{
      return await processImage(placeHolder);
    }catch(e){
      return await processImage("https://lippianfamilydentistry.net/wp-content/uploads/2015/11/user-default.png");
    }
  }
};

const asyncForEach = async (array, callback) => {
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index, array)
  }
};

module.exports = { readingTimeCalc, imgToDataURL, asyncForEach };