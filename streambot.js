const chalk = require("chalk");
const config = require("./config");
const twit = require("twit");
const T = new twit(config);

let stream = T.stream("statuses/filter", {
  track: [
    "#DreamsOfImran",
    "#JS",
    "#javascript",
    "#vuejs",
    "#Vue",
    "#reactjs",
    "#React",
    "#Nodejs",
  ],
});

stream.on("tweet", (tweet) => {
  T.post(
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
  T.post("favorites/create", { id: tweet.id_str }, (err, data, response) => {
    if (response) {
      console.log(
        chalk.bgRed("Liked") +
          ` ${tweet.user.name}'s (${tweet.user.screen_name}) Tweet`
      );
    }
    if (err) {
      console.log(chalk.redBright(err.message));
    }
  });
});
