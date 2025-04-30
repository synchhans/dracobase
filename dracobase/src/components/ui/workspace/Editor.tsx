import React from "react";
import MonacoEditor from "@monaco-editor/react";
import { emmetHTML, emmetJSX } from "emmet-monaco-es";

interface EditorProps {
  language: string;
  code: string;
  onChange: (value: string) => void;
}

const Editor: React.FC<EditorProps> = ({ language, code, onChange }) => {
  const handleEditorDidMount = (editor: any, monaco: any) => {
    if (editor) {
      switch (language) {
        case "html":
          emmetHTML(monaco);
          break;
        case "javascript":
          emmetJSX(monaco);
          break;
        default:
          console.warn(`No Emmet support for language: ${language}`);
      }
    }
  };

  return (
    <MonacoEditor
      height="320px"
      language={language}
      theme="vs-dark"
      value={code}
      onChange={(value) => onChange(value || "")}
      onMount={handleEditorDidMount}
      options={{
        quickSuggestions: true,
        suggestOnTriggerCharacters: true,
        tabCompletion: "onlySnippets",
        readOnly: false,
        minimap: { enabled: false },
        lineNumbers: "on",
        scrollBeyondLastLine: false,
        wordWrap: "on",
        fontSize: 14,
        tabSize: 2,
      }}
    />
  );
};

export default Editor;