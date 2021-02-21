/*
 *   이 콘텐트는 W3C 소프트웨어 라이선스에 따라 라이선스가 부여되었습니다
 *   https://www.w3.org/Consortium/Legal/2015/copyright-software-and-document
 *
 */

'use strict';

window.addEventListener('load', function () {
  var button = document.getElementById('alert-trigger');

  button.addEventListener('click', addAlert);
});

/*
 * @function addAlert
 *
 * @desc 페이지에 경고 추가
 *
 * @param   {object}  event  -  Standard W3C event object
 *
 */

function addAlert() {
  var example = document.getElementById('example');
  var template = document.getElementById('alert-template').innerHTML;

  example.innerHTML = template;
}
