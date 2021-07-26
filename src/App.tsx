import Editor, { Monaco } from '@monaco-editor/react';
import {
	asCParser,
	asCScriptCode,
	asCScriptNode,
	asCTokenizer,
	eScriptNode,
} from 'angelscript-parser/build/main/source';
import type { editor, MarkerSeverity } from 'monaco-editor';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import ReactJson from 'react-json-view';
import './App.css';

const App = () => {
	const [code, setCode] = useState('');
	const [ast, setAST] = useState({});

	const tokenizer = useMemo(() => new asCTokenizer(), []);
	const parser = useMemo(() => new asCParser(tokenizer), []);
	const scriptCode = useMemo(() => new asCScriptCode(), []);

	const [editor, setEditor] = useState<editor.IStandaloneCodeEditor | null>(
		null,
	);
	const [monaco, setMonaco] = useState<Monaco | null>(null);

	const deepParse = useCallback(
		(node: asCScriptNode) => {
			if (node.nodeType == eScriptNode.snAssignment) {
				if (
					node.parent?.nodeType == eScriptNode.snDeclaration ||
					node.parent?.nodeType == eScriptNode.snEnum
				) {
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
		},
		[parser, scriptCode, code],
	);

	// on script changed, parse the script again
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

	// error report
	useEffect(() => {
		if (editor && monaco) {
			const model = editor.getModel();

			if (model) {
				const markerData = parser.getLogs().map((i) => ({
					severity: (i.severity << 1) as any as MarkerSeverity,
					message: i.message,
					startLineNumber: i.row,
					startColumn: i.col,
					endLineNumber: i.row,
					endColumn: i.col,
				}));

				monaco.editor.setModelMarkers(model, 'angelscript', markerData);
			}
		}
	}, [editor, monaco, code]);

	return (
		<div className="horizontal-wrapper">
			<div className="horizontal-item">
				<Editor
					language={'c'}
					width="100%"
					height="100vh"
					theme="vs-dark"
					value={code}
					onChange={(value) => {
						if (value) {
							setCode(value);
						}
					}}
					onMount={async (e, m) => {
						const res = await fetch('/default.as');
						const text = await res.text();
						e.setValue(text);
						// mount editor instances
						setEditor(e);
						setMonaco(m);
						// set code
						setCode(text);
					}}
				/>
			</div>
			<div className="horizontal-item">
				<ReactJson src={ast} collapsed={true} />
			</div>
		</div>
	);
};

export default App;
