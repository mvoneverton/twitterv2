'use strict';

var Handlebars = require('hbsfy/runtime');
var compose = require('../templates/compose.handlebars');
var tweet = require('../templates/tweet.handlebars');
var thread = require('../templates/thread.handlebars');


var renderCompose = function() {
    return compose();
  };

var renderTweet = function(user) {
  return tweet({
    handle: user.handle,
    img: user.img,
    message: user.message,
    tweetId: user.tweetId
  });
};

var renderThread = function(tweet) {
  return thread({
    tweet: tweet,
    compose: compose
  });
};

module.exports = {
  renderCompose: renderCompose,
  renderTweet: renderTweet,
  renderThread: renderThread
};