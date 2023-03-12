const Parser = require('rss-parser');
const parser = new Parser();

const userArticles = async (username) => {

  const imageRegex = /<img[^>]+src="?([^"\s]+)"?\s*\/>/g;

  const feed = await parser.parseURL(`https://medium.com/feed/@${username}`);
  let result = [];
  const imgUrl = feed.image.url;

  feed.items.forEach((item) => {
    const imageObj = imageRegex.exec(item['content:encoded']);
    if (imageObj) {
      item.thumbnail = imageObj[1];
    }
    item.content = item['content:encoded'];
    item.author = item['creator'];
    result = [...result, item];
  });

  return {profileImgUrl: imgUrl, articles: result};

};

module.exports = { userArticles };