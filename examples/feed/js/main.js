/*
 *   이 콘텐트는 W3C 소프트웨어 라이선스에 따라 라이선스가 부여되었습니다
 *   https://www.w3.org/Consortium/Legal/2015/copyright-software-and-document
 */

/* global aria */

'use strict';

/**
 * ARIA Feed Example
 *
 * @function onload
 * @description Initialize the feed once the page has loaded
 */
window.addEventListener('load', function () {
  var feedNode = document.getElementById('restaurant-feed');
  var delaySelect = document.getElementById('delay-time-select');
  var restaurantFeed = new aria.Feed(feedNode, delaySelect);

  var restaurantFeedDisplay = new aria.FeedDisplay(restaurantFeed, function () {
    return aria.RestaurantData;
  });

  restaurantFeedDisplay.setDelay(delaySelect.value);
  delaySelect.addEventListener('change', function () {
    restaurantFeedDisplay.setDelay(delaySelect.value);
  });
});
