document.getElementById('startReply').addEventListener('click', () => {
  const searchBox = document.getElementById('searchBox');
  if (!searchBox) {
    console.error('searchBox element not found');
    return;
  }
  console.log('=====: ' + JSON.stringify(searchBox));
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.scripting.executeScript({
      target: { tabId: tabs[0].id },
      function: performSearch,
      args: [searchBox.value] // 传递 searchBox 的值而非 searchBox 元素
    });
  });
});

function performSearch(searchQuery) {
  if (window.location.href.startsWith('https://github.com')) {
    if (searchQuery) { // 检查 searchQuery 是否存在
      fetch(`https://github.com/search?q=${searchQuery}&type=code`, {
        "headers": {
          "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
          "accept-language": "zh-CN,zh;q=0.9,en;q=0.8,en-GB;q=0.7,en-US;q=0.6",
          "sec-ch-ua": "\"Chromium\";v=\"134\", \"Not:A-Brand\";v=\"24\", \"Microsoft Edge\";v=\"134\"",
          "sec-ch-ua-mobile": "?0",
          "sec-ch-ua-platform": "\"Windows\"",
          "sec-fetch-dest": "document",
          "sec-fetch-mode": "navigate",
          "sec-fetch-site": "same-origin",
          "sec-fetch-user": "?1",
          "upgrade-insecure-requests": "1",
          "Referer": "https://github.com/",
          "Referrer-Policy": "strict-origin-when-cross-origin"
        },
        "method": "GET"
      })
      .then(response => response.text())
      .then(data => {
        // 处理返回的数据
        console.log(data);
      })
      .catch(error => {
        console.error('Error:', error);
      });
    } else {
      console.error('searchQuery is empty');
    }
  }
}