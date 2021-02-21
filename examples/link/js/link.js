/*
 *   이 콘텐트는 W3C 소프트웨어 라이선스에 따라 라이선스가 부여되었습니다
 *   https://www.w3.org/Consortium/Legal/2015/copyright-software-and-document
 */

/* exported goToLink */

'use strict';

function goToLink(event, url) {
  var type = event.type;

  if (type === 'click' || (type === 'keydown' && event.keyCode === 13)) {
    window.location.href = url;

    event.preventDefault();
    event.stopPropagation();
  }
}
