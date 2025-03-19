document.getElementById('startSearch').addEventListener('click', () => {
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
  if (window.location.href.startsWith('https://ai.taobao.com')) {
    if (searchQuery) { // 检查 searchQuery 是否存在
      fetch(`https://ai.taobao.com/search/index.htm?_v=d&spm=a2e1u.27655827.search.1&key=${encodeURIComponent(searchQuery)}&pid=mm_5539777028_3063500466_115634500434&union_lens=recoveryid:557786228_0@1742400951330;prepvid:201_33.60.183.145_1466137_1742400974556&rootPageId=20150318020018244`, {
        "headers": {
          "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
          "accept-language": "zh-CN,zh;q=0.9,en;q=0.8,en-GB;q=0.7,en-US;q=0.6",
          "priority": "u=0, i",
          "sec-ch-ua": "\"Chromium\";v=\"134\", \"Not:A-Brand\";v=\"24\", \"Microsoft Edge\";v=\"134\"",
          "sec-ch-ua-mobile": "?0",
          "sec-ch-ua-platform": "\"Windows\"",
          "sec-fetch-dest": "document",
          "sec-fetch-mode": "navigate",
          "sec-fetch-site": "same-origin",
          "sec-fetch-user": "?1",
          "upgrade-insecure-requests": "1",
          "Referer": "https://ai.taobao.com/search/index.htm?_v=d&spm=a2e1u.27655827.search.1&key=%E7%AC%94%E8%AE%B0%E6%9C%AC&pid=mm_5539777028_3063500466_115634500434&union_lens=recoveryid%3A557786228_0%401742400951330%3Bprepvid%3A201_33.44.19.7_12861470_1742400967723&rootPageId=20150318020018244",
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