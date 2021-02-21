/*
 *   이 콘텐트는 W3C 소프트웨어 라이선스에 따라 라이선스가 부여되었습니다
 *   https://www.w3.org/Consortium/Legal/2015/copyright-software-and-document
 */

/* global aria */

'use strict';

/**
 * ARIA Scrollable Listbox Example
 *
 * @function onload
 * @description Initialize the listbox example once the page has loaded
 */

window.addEventListener('load', function () {
  new aria.Listbox(document.getElementById('ss_elem_list'));
});
