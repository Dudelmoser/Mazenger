const fs = require("fs");
const request = require("request");
const download = require("download");

// requests top 100 memes from imgflip, downloads them and creates an array with their names and URLs
module.exports = (dir, cb) => {
  request.get("https://api.imgflip.com/get_memes", (err, res, body) => {
    let memes = JSON.parse(body).data.memes;
    let result = [];

    for (let meme of memes) {
      console.log(meme);
      const url = "/" + meme.id + ".jpg";

      download(meme.url).then(data => {
        fs.writeFileSync(dir + url, data);
      });

      result.push({
        name: meme.name,
        url
      });
    }

    cb(result);
  });
}
