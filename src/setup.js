/**
 * auto complteの設定
 * @param selector
 */
const setAutocomplete = (selector) => {
  // redmineの担当者のリスト
  const select = document.getElementById(selector);

  // auto completeで利用するリスト
  const datalist = document.createElement('datalist');
  datalist.setAttribute('id', selector);

  // 担当者リストからdatalistを作成
  let assignedName = '';
  Array.from(select.options)
    .filter((elem) => {
      return elem.value.length > 0;
    })
    .map((elem) => {
      const option = document.createElement('option');
      option.setAttribute('value', elem.text);
      option.setAttribute('data-id', elem.value);
      datalist.appendChild(option);
      if (elem.selected) {
        assignedName = elem.text;
      }
    });

  // 担当者のリストの前にauto completeの入力欄を表示
  select.insertAdjacentHTML(
    'beforebegin',
    '<input type="search" placeholder="Double click." ' +
    'id="issue_assigned_search" list="' + selector + '" ' +
    'autocomplete="off" value="' + assignedName + '">'
  );
  const input = document.getElementById('issue_assigned_search');
  // 入力欄の後にdatalistを設定
  input.insertAdjacentHTML('afterend', datalist.outerHTML);

  // 入力欄に変更が合った場合
  input.addEventListener("change", (ev) => {
    for (let i = 0; i < select.length; i++) {
      if (select.options[i].innerText === ev.target.value) {
        // 担当者リストを選択状態にする
        select.options[i].setAttribute('selected', 'selected');
      } else {
        // 初期化
        select.options[i].removeAttribute('selected');
      }
    }
  });

  // 担当者リストを非表示
  select.setAttribute('hidden', 'hidden');
};

/**
 * 登録・編集画面でajax callするプルダウンを変更した際の処理
 */
const setPullDownOnchange = () => {
  const ajaxCallIds = ['issue_project_id', 'issue_tracker_id', 'issue_status_id'];
  ajaxCallIds.map((selector) => {
    const select = document.getElementById(selector);
    if (select !== null) {
      select.onchange = () => {
        changed = true;
      };
    }
  })
};

/**
 * 設定
 */
const setUp = () => {
  setAutocomplete('issue_assigned_to_id');
  setPullDownOnchange();
};

setUp();