/*
 *   이 콘텐트는 W3C 소프트웨어 라이선스에 따라 라이선스가 부여되었습니다
 *   https://www.w3.org/Consortium/Legal/2015/copyright-software-and-document
 *
 *   간단한 아코디언 패턴 예제
 */

'use strict';

Array.prototype.slice
  .call(document.querySelectorAll('.Accordion'))
  .forEach(function (accordion) {
    // 여러 아코디언 섹션이 동시에 확장되도록 허용
    var allowMultiple = accordion.hasAttribute('data-allow-multiple');
    // 각 토글이 개별적으로 열고 닫도록 허용
    var allowToggle = allowMultiple
      ? allowMultiple
      : accordion.hasAttribute('data-allow-toggle');

    // 아코디언 그룹의 토글 엘리먼트 배열 생성
    var triggers = Array.prototype.slice.call(
      accordion.querySelectorAll('.Accordion-trigger')
    );

    accordion.addEventListener('click', function (event) {
      var target = event.target;

      if (target.classList.contains('Accordion-trigger')) {
        // 현재 토글이 확장 되어 있는지 확인
        var isExpanded = target.getAttribute('aria-expanded') == 'true';
        var active = accordion.querySelector('[aria-expanded="true"]');

        // allowMultiple 없이 열린 아코디언 닫음
        if (!allowMultiple && active && active !== target) {
          // 트리거 엘리먼트에 확장 상태 설정
          active.setAttribute('aria-expanded', 'false');
          // 원하는 섹션을 지정하도록 aria-controls를 사용하여 아코디언 섹션 숨김
          document
            .getElementById(active.getAttribute('aria-controls'))
            .setAttribute('hidden', '');

          // 토글이 허용되지 않는 경우, 비활성화 된 상태를 정리
          if (!allowToggle) {
            active.removeAttribute('aria-disabled');
          }
        }

        if (!isExpanded) {
          // 트리거 엘리먼트에 확장 상태를 설정
          target.setAttribute('aria-expanded', 'true');
          // 원하는 섹션을 지정하도록 aria-controls를 사용하여 아코디언 섹션 숨김 해제
          document
            .getElementById(target.getAttribute('aria-controls'))
            .removeAttribute('hidden');

          // 토글이 허용되지 않는 경우, 트리거에 비활성화 상태 설정
          if (!allowToggle) {
            target.setAttribute('aria-disabled', 'true');
          }
        } else if (allowToggle && isExpanded) {
          // 트리거 엘리먼트에 확장 상태 설정
          target.setAttribute('aria-expanded', 'false');
          // 원하는 섹션을 지정하도록 aria-controls를 사용하여 아코디언 섹션 숨김
          document
            .getElementById(target.getAttribute('aria-controls'))
            .setAttribute('hidden', '');
        }

        event.preventDefault();
      }
    });

    // 주 아코디언 컨테이너에 키보드 동작 바인딩
    accordion.addEventListener('keydown', function (event) {
      var target = event.target;
      var key = event.which.toString();

      // 33 = Page Up, 34 = Page Down
      var ctrlModifier = event.ctrlKey && key.match(/33|34/);

      // 아코디언 헤더로부터 온 것인가?
      if (target.classList.contains('Accordion-trigger')) {
        // 위/아래 방향키와 Control + Page Up/ Page Down 키보드 작업
        // 38 = Up, 40 = Down
        if (key.match(/38|40/) || ctrlModifier) {
          var index = triggers.indexOf(target);
          var direction = key.match(/34|40/) ? 1 : -1;
          var length = triggers.length;
          var newIndex = (index + length + direction) % length;

          triggers[newIndex].focus();

          event.preventDefault();
        } else if (key.match(/35|36/)) {
          // 35 = End, 36 = Home 키보드 작업
          switch (key) {
            // 첫 번재 아코디언으로 이동
            case '36':
              triggers[0].focus();
              break;
            // 마지막 아코디언으로 이동
            case '35':
              triggers[triggers.length - 1].focus();
              break;
          }
          event.preventDefault();
        }
      }
    });

    // 버튼 중 하나에 초점이 있을 때 아코디언을 스타일링하는 데 사용 됨
    accordion
      .querySelectorAll('.Accordion-trigger')
      .forEach(function (trigger) {
        trigger.addEventListener('focus', function () {
          accordion.classList.add('focus');
        });

        trigger.addEventListener('blur', function () {
          accordion.classList.remove('focus');
        });
      });

    // 마이너 설정: aria-disabled를 통해 비활성화 된 상태가 토글할 수 없는
    // 확장 된/ 활성 아코디언으로 설정 되게 함
    if (!allowToggle) {
      // 첫 번째 확장된/ 활성 아코디언 획득
      var expanded = accordion.querySelector('[aria-expanded="true"]');

      // 확장된/ 활성 아코디언이 발견되면, 비활성화
      if (expanded) {
        expanded.setAttribute('aria-disabled', 'true');
      }
    }
  });
