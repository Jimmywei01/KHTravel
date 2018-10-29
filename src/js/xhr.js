
 let selectData = []
 let xhr = new XMLHttpRequest()
 xhr.open('get', 'https://data.kcg.gov.tw/api/action/datastore_search?resource_id=92290ee5-6e61-456f-80c0-249eae2fcc97', true)
 xhr.send()
 xhr.onload = function () {
   if (xhr.readyState === 4 && xhr.status === 200) {
     let callback = JSON.parse(xhr.responseText)
     selectData = callback.result.records
     // 把 load 回來的資料從 xhr 傳出去做處理
     xhrData()
   }
 }

// set 寫法 篩選地區名
// 接到 xhrData 處理 select下拉選單
let value = []
function xhrData() {  
  let areaValue = []
  for (let i = 0; i < selectData.length; i++) {
    const selectArea = selectData[i].Zone
    areaValue.push(selectArea)
  }
  // 用 set 把多餘的地區值移除
  let iterable = new Set(areaValue)
  for (let value of iterable) {
     // append 到 select 選單
     const area = document.querySelector('.area')
     const oldNode = document.querySelector('option')
     const newNode = document.createElement('option')
     let areaText = document.createTextNode(value)
     newNode.appendChild(areaText)
     area.appendChild(newNode, oldNode)
    strData()
  }
}

// 地區名
 let areaTitle = document.querySelector('.areaTitle')

// 選擇行政區資訊
 let row = document.querySelector('.row')
 
// 選擇行政區
 let select = document.querySelector('.area')
 select.addEventListener('change', function(e){
    value = e.target.value   // 篩選後的直帶入當作 value 為了之後的info比對
    strData()
 }, 'false')

 // 熱門行政區 點選顯示區域資料
 // 多子選項必須要先拿出來才能選擇 否則 addEventlistener 錯誤
 let btns = document.querySelectorAll('.btn')
 for (let i = 0; i < btns.length; i++) {
   btns[i].addEventListener('click', function(e){
     value = e.target.value // 篩選後的值帶入當作 value 為了之後的info比對
     strData()
   }, 'false')
 }

 
 
 function strData() {
  let str = ' ' // 取出變數為單一地區值，不取出則在選擇到另外一個區域，區域值會累加
   for (let i = 0; i < selectData.length; i++) {
     if (value === selectData[i].Zone) {
      areaTitle.innerHTML = `${selectData[i].Zone}`
       str +=
         ` 
           <div class="boxCard">
          <div class="cover">
            <img src="${selectData[i].Picture1}" alt="none">
          </div>
          <div class="barInfo">
            <h3 class="cTitle">${selectData[i].Name}</h3>
            <div class="barName">${selectData[i].Zone}</div>
          </div>
          <div class="areaInfo">
            <div class="time">${selectData[i].Opentime}</div>
            <div class="add">${selectData[i].Add}</div>
            <div class="phone">${selectData[i].Tel}</div>
          </div>
          <div class="ticket">${selectData[i].Ticketinfo}</div>
        </div> 
    `
     }
   }
   row.innerHTML = str
 }
