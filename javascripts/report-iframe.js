// 回測報告以 iframe 內嵌，依內容調整高度，避免出現內層捲軸。
// 報告與網站同源，可直接讀取 contentDocument。圖表在 load 之後才繪製完成，
// 視窗寬度改變時內容也會重新換行，因此持續觀察內容高度，而不是只在 load 時量一次。
// iframe 的 load 事件不會冒泡，需在捕獲階段監聽。
document.addEventListener("load", (event) => {
  const frame = event.target;
  if (!(frame instanceof HTMLIFrameElement) || !frame.classList.contains("report")) {
    return;
  }
  const root = frame.contentDocument?.documentElement;
  if (!root) {
    return;
  }
  new ResizeObserver(() => {
    // 主題的 box-sizing 為 border-box，需加上外框；寬表格出現水平捲軸時，
    // 捲軸會佔用可視高度，也需補上
    const border = frame.offsetHeight - frame.clientHeight;
    const scrollbar = frame.contentWindow.innerHeight - root.clientHeight;
    // scrollHeight 不會小於 iframe 可視高度，內容較矮時縮不回來，改用 offsetHeight
    frame.style.height = root.offsetHeight + border + scrollbar + "px";
  }).observe(frame.contentDocument.body);
}, true);
