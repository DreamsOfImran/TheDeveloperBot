const config = require("./config");
const Twit = require("twit");
const T = new Twit(config);

T.get('search/tweets', { q: 'cheerupraja00710' },  function (err, data, response) {
  console.log(data)
})