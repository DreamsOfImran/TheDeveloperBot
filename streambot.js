const config = require("./config");
const twit = require("twit");
const T = new twit(config);

let stream = T.stream("statuses/filter", {
  track:
    "#DreamsOfImran OR #JS OR #javascript OR #vuejs OR #Vue OR #reactjs OR #React",
});

stream.on("tweet", (tweet) => {
  T.post("statuses/retweet/:id", { id: tweet.id_str }, responseCallback);
});

function responseCallback(err, data, response) {
  if (response) {
    console.log("Retweeted!!!");
  }
  if (err) {
    console.log(err.message);
  }
}
