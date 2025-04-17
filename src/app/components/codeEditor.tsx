import React, { useEffect, useRef } from "react";
import CodeMirror from "codemirror";
import "codemirror/lib/codemirror.css";
import "codemirror/theme/dracula.css";
import "codemirror/mode/javascript/javascript";
import "codemirror/mode/python/python";
import "codemirror/mode/xml/xml";
import "codemirror/mode/markdown/markdown";
import "codemirror/mode/css/css";
import "codemirror/mode/htmlmixed/htmlmixed";

interface CodeEditorProps {
  content: string;
  language: string;
  onChange: (newContent: string) => void;
}

export default function CodeEditor({ content, language, onChange }: CodeEditorProps) {
  const editorRef = useRef<HTMLDivElement>(null);
  const editorInstance = useRef<CodeMirror.Editor | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined" && editorRef.current && !editorInstance.current) {
      editorInstance.current = CodeMirror(editorRef.current, {
        value: content,
        mode: language,
        theme: "dracula",
        lineNumbers: true,
      });

      editorInstance.current.on("change", (editor: CodeMirror.Editor) => {
        onChange(editor.getValue());
      });
    } else if (editorInstance.current) {
      editorInstance.current.setOption("mode", language);
    }
  }, [language]);

  useEffect(() => {
    if (editorInstance.current) {
      editorInstance.current.setValue(content);
    }
  }, [content]);

  return <div ref={editorRef} style={{ border: "1px solid #ccc", height: "300px" }}></div>;
}