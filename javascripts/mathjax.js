// MathJax 設定，對應 pymdownx.arithmatex 的 generic 輸出：
// 行內公式包在 \( \)，區塊公式包在 \[ \]，且只處理 .arithmatex 元素，
// 避免誤判文中其他的 $ 符號（例如金額）。
window.MathJax = {
  tex: {
    inlineMath: [["\\(", "\\)"]],
    displayMath: [["\\[", "\\]"]],
    processEscapes: true,
    processEnvironments: true
  },
  options: {
    ignoreHtmlClass: ".*|",
    processHtmlClass: "arithmatex"
  }
};

// 主題的 document$ 在每次頁面載入（含 instant navigation）時發出，需重新排版
document$.subscribe(() => {
  MathJax.startup.output.clearCache();
  MathJax.typesetClear();
  MathJax.texReset();
  MathJax.typesetPromise();
});
