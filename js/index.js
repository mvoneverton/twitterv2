'use strict';

var currentUser = {
  handle: '@bradwestfall',
  img: 'brad.png',
  id: 1
};

var $ = require('jquery');
var tmpl = require('./template');
var api = require('./api');
var root = 'http://localhost:3000';

$(function () {


	api.getServerTweets();


	$('#main').on('click', 'textarea', function () {
	    $(this).parent('.compose').addClass('expand');
	    return false;
	  });

	  $('#tweets').on('click', '.tweet', function () {
	    $(this).parent('.thread').toggleClass('expand');
	    return false;
	  });

	  $('#main').on('submit', 'form', function() {
	    var message = $(this).find('textarea').val();
	    currentUser.message = message;

	    $(this)
	      .find('textarea')
	      .val('')
	      .parent('.compose')
	      .removeClass('expand');

	    if ($(this).parent('header').length) {

	    	$.post(root + '/tweets', 
		    	{
		    		userId: currentUser.id,
		    		message: currentUser.message
		    	})
	    		.then(function () {
	      		$('#tweets').append(tmpl.renderThread(tmpl.renderTweet(currentUser), tmpl.renderCompose()));	
	    		})
	    		.fail(function (xhr) {
	    			console.log(xhr.status);
	    		});

	    } else {

	    	var tweetId = $(this).parents('.thread').find('.tweet').attr('id');
	      $(this).parents('.replies').append(tmpl.renderTweet(currentUser));

	    	$.post(root + '/replies',
		    	{
		    		userId: currentUser.id,
		    		tweetId: tweetId,
		    		message: currentUser.message
		    	})
	    		.then(function (newReply) {
	    			console.log('winner', newReply);	
	    		})
	    		.fail(function (xhr) {
	    			console.log(xhr.status);
	    		});
	    }
	    return false;
	  });

});