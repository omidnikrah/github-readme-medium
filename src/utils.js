const fetch = require('node-fetch');

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

const imgToDataURL = url => {
  return fetch(url).then(response => response.buffer()).then(buffer => `data:image/png;base64,${buffer.toString('base64')}`);
};

const asyncForEach = async (array, callback) => {
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index, array)
  }
};

module.exports = { readingTimeCalc, imgToDataURL, asyncForEach };