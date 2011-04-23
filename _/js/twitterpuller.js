/* QUESTIONS FOR AARON

1. Many Twitter results are not in English. Can we do something to specify only English results? (Note to self: Look at Twitter API).
2. Why did we abandon the "this.var" construction inside of TwitterPuller.prototype.searchTwitterCallback? (Note to self: Must have to do with scope being secure, but get Aaron's thoughts on this).
3. Question around line 80.


 */




function TwitterPuller() {
  this.init();
}

TwitterPuller.prototype.init = function() {
  this._$searchBox = jQuery('#about_entry');
  this._$searchButton = jQuery('#search_btn');
  this.bindEvents();
}

TwitterPuller.prototype.bindEvents = function() {
  this._$searchButton.bind('click', jQuery.proxy(function(ev) { 
    this.buttonPush();
  }, this));
  this._$searchBox.bind('keyup', jQuery.proxy(function(ev) {
    this.handleKeyPress(ev);
  }, this));
}

TwitterPuller.prototype.searchTwitter = function() {
  //show loading image
  var $twitterList = jQuery('#twitter_feed');
  var $loadingImg = jQuery('<img src="_/img/ajax-loader.gif" />');
  $twitterList.empty();
  $twitterList.append($loadingImg);
  
  
  var searchText = this._$searchBox.val();
  
  var _url = "http://search.twitter.com/search.json?q=" + encodeURIComponent(searchText);
  
  jQuery.ajax({
    url:_url
    ,dataType:'jsonp'
    ,success:jQuery.proxy(function(responseObject){
      this.searchTwitterCallback(responseObject);
    },this)
    ,error:function() {}
  });
}





TwitterPuller.prototype.searchTwitterCallback = function(responseObject) {
  var $twitterList = jQuery('#twitter_feed');
  $twitterList.empty();
  
  
  if(responseObject.results != null && responseObject.results.length > 0) {
    for(var i=0; i<responseObject.results.length; i++) {
      var aTweet = responseObject.results[i];
      //aTweet.text
      //aTweet.profile_image_url
      //aTweet.from_user
      var $profileImage = jQuery('<img />');
      var $profileImageWrapper = jQuery('<a />');
      var $userHolder = jQuery('<a />');
      var $dateHolder = jQuery('<span />');
      var $textHolder = jQuery('<div class="tweet_text" />');
      var profileURL = "http://twitter.com/#!/" + aTweet.from_user;
      var $li = jQuery('<li />');
      
      // Use RegEx to parse aTweet.created_at to show only the Day, Month and Year.
      var parse_tweet_time = aTweet.created_at.match(/\d.\s\w+\s\d+/);
      
      // ASK AARON ABOUT THIS: Use RegEx to find @replies in aTweet.text. Turn these into links.
      //var parse_tweet_text = aTweet.text.match(/@\w+/g);
      //  if(parse_tweet_text !== null){
      //    for(var d=0; d<parse_tweet_text.length; d++){
      //      var $at_reply_link = jQuery('<a class="at_reply" />');
      //      var at_reply_URL = "http://twitter.com/#!/" + parse_tweet_text[d];
      //      $at_reply_link.attr('href', at_reply_URL);
      //      console.log($at_reply_link);
      //    }
      //  }
      
      $profileImage.attr('src', aTweet.profile_image_url);
      $profileImageWrapper.html($profileImage).attr('href', profileURL);
      
      $userHolder.html(aTweet.from_user).attr('href', profileURL);
      
      $textHolder.html(aTweet.text);
      $dateHolder.html(parse_tweet_time[0]);
      
      
      $li.append($profileImageWrapper)
         .append($userHolder)
         .append($dateHolder)
         .append($textHolder);
      $twitterList.append($li);
    }
  }
  
  
}





TwitterPuller.prototype.buttonPush = function() {
  this.searchTwitter();
}

TwitterPuller.prototype.handleKeyPress = function(ev) {
  if (ev.keyCode == 13) {
    this.searchTwitter();
  }
}
