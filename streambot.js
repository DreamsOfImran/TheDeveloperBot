const chalk = require("chalk");
const config = require("./config");
const Twit = require("twit");
const T = new Twit(config);

let stream = T.stream("statuses/filter", {
  track: [
    "#DreamsOfImran",
    "#javascript",
    "#vuejs",
    "#Vue",
    "#reactjs",
    "#Nodejs",
  ],
});

stream.on("tweet", async (tweet) => {
  if (!isReply(tweet)) {
    await T.post(
      "favorites/create",
      { id: tweet.id_str },
      (err, data, response) => {
        if (response) {
          console.log(
            chalk.bgRed("Liked") +
              ` ${tweet.user.name}'s (${tweet.user.screen_name}) Tweet`
          );
        }
        if (err) {
          console.log(chalk.redBright(err.message));
        }
      }
    );

    await T.post(
      "statuses/retweet/:id",
      { id: tweet.id_str },
      (err, data, response) => {
        if (response) {
          console.log(
            chalk.bgGreen("Retweeted") +
              ` ${tweet.user.name}'s (${tweet.user.screen_name}) Tweet`
          );
        }
        if (err) {
          console.log(chalk.redBright(err.message));
        }
      }
    );
  }
});

function isReply(tweet) {
  if (
    tweet.retweeted_status ||
    tweet.in_reply_to_status_id ||
    tweet.in_reply_to_status_id_str ||
    tweet.in_reply_to_user_id ||
    tweet.in_reply_to_user_id_str ||
    tweet.in_reply_to_screen_name
  )
    return true;
}
