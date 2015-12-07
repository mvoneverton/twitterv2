
var $ = require('jquery');
var tmpl = require('./template');
var root = 'http://localhost:3000';

function getServerTweets() {
	$.get(root + '/users')
		.then(function (users) {
			users.forEach(function (user) {
				$.get(root + '/users/' + user.id + '/tweets')
					.then(function (userTweets) {
						userTweets.forEach(function (userTweet) {
							user.message = userTweet.message;
							user.tweetId = userTweet.id;
							$('#tweets').append(tmpl.renderThread(tmpl.renderTweet(user), tmpl.renderCompose()));
						});
						$.get(root + '/tweets/' + user.tweetId + '/replies')
							.then(function (tweetReplies) {
								tweetReplies.forEach(function (tweetReply) {
									$.get(root + '/users/' + tweetReply.userId)
										.then(function (userReply) {
											userReply.id = null;
											userReply.message = tweetReply.message;
											$('#' + user.tweetId)
											.parent('.thread')
											.find('.replies').append(tmpl.renderTweet(userReply)); 
											});
										});
								});
							})
							.fail(function (xhr) {
								console.log(xhr.status);
							});
					});
			})
			.fail(function (xhr) {
				console.log('lame', xhr.status);
			});
}

module.exports = {
	getServerTweets: getServerTweets

};


