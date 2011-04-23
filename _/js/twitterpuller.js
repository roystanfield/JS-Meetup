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
      var $textHolder = jQuery('<div />');
      var profileURL = "http://twitter.com/#!/" + aTweet.from_user;
      var $li = jQuery('<li />');
      
      $profileImage.attr('src', aTweet.profile_image_url);
      $profileImageWrapper.html($profileImage).attr('href', profileURL);
      
      $userHolder.html(aTweet.from_user).attr('href', profileURL);
      
      $textHolder.html(aTweet.text);
      $dateHolder.html(aTweet.created_at);
      
      
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
