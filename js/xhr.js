'use strict';

var selectData = [];
var xhr = new XMLHttpRequest();
xhr.open('get', 'https://data.kcg.gov.tw/api/action/datastore_search?resource_id=92290ee5-6e61-456f-80c0-249eae2fcc97', true);
xhr.send();
xhr.onload = function () {
  if (xhr.readyState === 4 && xhr.status === 200) {
    var callback = JSON.parse(xhr.responseText);
    selectData = callback.result.records;
    // 把 load 回來的資料從 xhr 傳出去做處理
    xhrData();
  }
};

// set 寫法 篩選地區名
// 接到 xhrData 處理 select下拉選單
var value = [];
function xhrData() {
  var areaValue = [];
  for (var i = 0; i < selectData.length; i++) {
    var selectArea = selectData[i].Zone;
    areaValue.push(selectArea);
  }
  // 用 set 把多餘的地區值移除
  var iterable = new Set(areaValue);
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = iterable[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var _value = _step.value;

      // append 到 select 選單
      var area = document.querySelector('.area');
      var oldNode = document.querySelector('option');
      var newNode = document.createElement('option');
      var areaText = document.createTextNode(_value);
      newNode.appendChild(areaText);
      area.appendChild(newNode, oldNode);
      strData();
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator.return) {
        _iterator.return();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }
}

// 地區名
var areaTitle = document.querySelector('.areaTitle');

// 選擇行政區資訊
var row = document.querySelector('.row');

// 選擇行政區
var select = document.querySelector('.area');
select.addEventListener('change', function (e) {
  value = e.target.value; // 篩選後的直帶入當作 value 為了之後的info比對
  strData();
}, false);

//  // 熱門行政區 點選顯示區域資料
//  // 多子選項必須要先拿出來才能選擇 否則 addEventlistener 錯誤
//  let btns = document.querySelectorAll('.btn')
//  for (let i = 0; i < btns.length; i++) {
//    btns[i].addEventListener('click', function(e){
//      value = e.target.value // 篩選後的值帶入當作 value 為了之後的info比對
//      strData()
//    }, false)
//  }

// 改寫 由父元素裡頭監聽裡頭子元素的作法。好處就是效能較好，網頁上不會有太多監聽影響效能。
var btns = document.querySelector('.starArea');
btns.addEventListener('click', function (e) {
  if (e.target.nodeName !== "BUTTON") {
    return;
  }
  value = e.target.value;
  strData();
}, false);

function strData() {
  var str = ' '; // 取出變數為單一地區值，不取出則在選擇到另外一個區域，區域值會累加
  for (var i = 0; i < selectData.length; i++) {
    if (value === selectData[i].Zone) {
      areaTitle.innerHTML = '' + selectData[i].Zone;
      str += ' \n           <div class="boxCard">\n          <div class="cover">\n            <img src="' + selectData[i].Picture1 + '" alt="none">\n          </div>\n          <div class="barInfo">\n            <h3 class="cTitle">' + selectData[i].Name + '</h3>\n            <div class="barName">' + selectData[i].Zone + '</div>\n          </div>\n          <div class="areaInfo">\n            <div class="time">' + selectData[i].Opentime + '</div>\n            <div class="add">' + selectData[i].Add + '</div>\n            <div class="phone">' + selectData[i].Tel + '</div>\n          </div>\n          <div class="ticket">' + selectData[i].Ticketinfo + '</div>\n        </div> \n    ';
    }
  }
  row.innerHTML = str;
}
//# sourceMappingURL=xhr.js.map
