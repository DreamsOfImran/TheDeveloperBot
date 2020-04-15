const config = require("./config");
const twit = require("twit");
const T = new twit(config);

let params = {
  q: "#javascript OR #vuejs OR #Vue OR #reactjs",
  count: 10,
  recent_type: "recent",
};

function retweet() {
  searchTweets(params);
}
setInterval(retweet, 120000);

function searchTweets(params) {
  T.get("search/tweets", params, (err, data, response) => {
    let tweets = data.statuses;
    if (!err) {
      for (let dat of tweets) {
        let retweetId = dat.id_str;
        postTweet(retweetId);
      }
    }
  });
}

function postTweet(retweetId) {
  T.post("/statuses/retweet/:id", { id: retweetId }, (err, response) => {
    if (response) {
      console.log("Retweeted!!!");
    }
    if (err) {
      console.log(
        "Something went wrong while retweeting. Duplication maybe..."
      );
    }
  });
}
