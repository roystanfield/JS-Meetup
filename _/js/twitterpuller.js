function TwitterPuller() {
  this.init();
}

TwitterPuller.prototype.init = function() {
  this._$searchBox = jQuery('#about_entry');
  this._$searchButton = jQuery('#search_btn');
  this.bindEvents();
  this.aaron();
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
      var $profileImage = jQuery('<img />');
      var $textHolder = jQuery('<div />');
      var $li = jQuery('<li />');
      
      $profileImage.attr('src', aTweet.profile_image_url);
      $textHolder.html(aTweet.text);
      $li.append($profileImage)
         .append($textHolder);
      $twitterList.append($li);
    }
  }
}

TwitterPuller.prototype.aaron = function() {
  
}

TwitterPuller.prototype.buttonPush = function() {
  this.searchTwitter();
}

TwitterPuller.prototype.handleKeyPress = function(ev) {
  if (ev.keyCode == 13) {
    this.searchTwitter();
  }
}

TwitterPuller.prototype.renderStream = function() {
  
}
