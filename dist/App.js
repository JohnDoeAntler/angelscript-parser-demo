import Editor from "../_snowpack/pkg/@monaco-editor/react.js";
import {
  asCParser,
  asCScriptCode,
  asCTokenizer,
  eScriptNode
} from "../_snowpack/pkg/angelscript-parser/build/main/source.js";
import React, {useCallback, useEffect, useMemo, useState} from "../_snowpack/pkg/react.js";
import ReactJson from "../_snowpack/pkg/react-json-view.js";
import "./App.css.proxy.js";
const App = () => {
  const [code, setCode] = useState("");
  const [ast, setAST] = useState({});
  const tokenizer = useMemo(() => new asCTokenizer(), []);
  const parser = useMemo(() => new asCParser(tokenizer), []);
  const scriptCode = useMemo(() => new asCScriptCode(), []);
  const [editor, setEditor] = useState(null);
  const [monaco, setMonaco] = useState(null);
  const deepParse = useCallback((node) => {
    if (node.nodeType == eScriptNode.snAssignment) {
      if (node.parent?.nodeType == eScriptNode.snDeclaration || node.parent?.nodeType == eScriptNode.snEnum) {
        parser.ParseVarInit(scriptCode, node);
      }
    } else if (node.nodeType == eScriptNode.snStatementBlock) {
      parser.ParseStatementBlock(scriptCode, node);
    } else if (node.nodeType == eScriptNode.snExpression) {
      if (node?.parent?.nodeType == eScriptNode.snParameterList) {
        const expression_raw = code.substr(node.tokenPos, node.tokenLength);
        if (expression_raw) {
          const expression_code = new asCScriptCode();
          expression_code.SetCode(expression_raw);
          parser.ParseExpression(expression_code);
        }
      }
    } else {
      let current = node.firstChild;
      while (current) {
        deepParse(current);
        current = current.next;
      }
    }
  }, [parser, scriptCode, code]);
  useEffect(() => {
    if (code) {
      parser.getLogs().length = 0;
      scriptCode.SetCode(code);
      parser.ParseScript(scriptCode);
      const node = parser.GetScriptNode();
      if (node) {
        deepParse(node);
        setAST(node);
      }
    }
  }, [code]);
  useEffect(() => {
    if (editor && monaco) {
      const model = editor.getModel();
      if (model) {
        const markerData = parser.getLogs().map((i) => ({
          severity: i.severity << 1,
          message: i.message,
          startLineNumber: i.row,
          startColumn: i.col,
          endLineNumber: i.row,
          endColumn: i.col
        }));
        monaco.editor.setModelMarkers(model, "angelscript", markerData);
      }
    }
  }, [editor, monaco, code]);
  return /* @__PURE__ */ React.createElement("div", {
    className: "horizontal-wrapper"
  }, /* @__PURE__ */ React.createElement("div", {
    className: "horizontal-item"
  }, /* @__PURE__ */ React.createElement(Editor, {
    language: "c",
    width: "100%",
    height: "100vh",
    theme: "vs-dark",
    value: code,
    onChange: (value) => {
      if (value) {
        setCode(value);
      }
    },
    onMount: async (e, m) => {
      const res = await fetch("/default.as");
      const text = await res.text();
      e.setValue(text);
      setEditor(e);
      setMonaco(m);
      setCode(text);
    }
  })), /* @__PURE__ */ React.createElement("div", {
    className: "horizontal-item"
  }, /* @__PURE__ */ React.createElement(ReactJson, {
    src: ast,
    collapsed: true
  })));
};
export default App;
