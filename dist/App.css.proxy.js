// [snowpack] add styles to the page (skip if no document exists)
if (typeof document !== 'undefined') {
  const code = ".horizontal-wrapper {\n  display: flex;\n  flex-direction: row;\n  height: 100vh;\n  overflow: hidden;\n}\n\n.horizontal-item {\n  flex: 1;\n  height: 100vh;\n}\n";

  const styleEl = document.createElement("style");
  const codeEl = document.createTextNode(code);
  styleEl.type = 'text/css';
  styleEl.appendChild(codeEl);
  document.head.appendChild(styleEl);
}