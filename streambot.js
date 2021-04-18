const chalk = require("chalk");
const config = require("./config");
const Twit = require("twit");
const T = new Twit(config);

let stream = T.stream("statuses/filter", {
  track: [
    "#DreamsOfImran",
    "#vuejs",
    "#Vue",
    "#reactjs",
    "#Nodejs",
    "#100DaysOfCode",
  ],
});

stream.on("tweet", (tweet) => {
  if (!isReply(tweet)) {
    const tweet_text = !!tweet?.extended_tweet?.full_text
      ? tweet.extended_tweet.full_text
      : tweet.text;
    if (!isSpam(tweet_text)) {
      T.post("favorites/create", { id: tweet.id_str }, (err, data, response) =>
        responseCallback(err, response, "Liked", tweet)
      );

      T.post(
        "statuses/retweet/:id",
        { id: tweet.id_str },
        (err, data, response) =>
          responseCallback(err, response, "Retweeted", tweet)
      );
    }
  }
});

function responseCallback(err, response, actionType, tweet) {
  if (response) {
    console.log(
      (actionType === "Retweeted"
        ? chalk.bgGreen(actionType)
        : chalk.bgRed(actionType)) +
        ` ${tweet.user.name}'s (${tweet.user.screen_name}) Tweet`
    );
  }
  if (err) {
    console.log(chalk.redBright(err.message));
  }
}

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

function isSpam(twitter_text) {
  const hashtags = twitter_text.split("#");
  const spam_hashtags = [
    "shit",
    "drug",
    "drugs",
    "weed",
    "homework",
    "essay",
    "essays",
    "essaypay",
    "essaydue",
    "essayhelp",
    "essay pay",
    "essay due",
    "essay write",
    "essay help",
    "paper pay",
    "homeworkslave",
    "cocaine",
    "drogue",
  ];
  const spam = hashtags.map((ht) =>
    spam_hashtags.includes(ht.trim().toLowerCase())
  );
  return spam.length > 0;
}
