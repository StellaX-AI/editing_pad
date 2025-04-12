import React, { useEffect, useRef } from "react";
import CodeMirror from "codemirror";
import "codemirror/lib/codemirror.css";
import "codemirror/theme/dracula.css";

interface CodeEditorProps {
  content: string;
  onChange: (newContent: string) => void;
}

export default function CodeEditor({ content, onChange }: CodeEditorProps) {
  const editorRef = useRef<HTMLDivElement>(null);
  const editorInstance = useRef<CodeMirror.Editor | null>(null);

  useEffect(() => {
    if (editorRef.current) {
      const editor = CodeMirror(editorRef.current, {
        value: content,
        mode: "javascript",
        theme: "dracula",
        lineNumbers: true,
      });

      editor.on("change", () => {
        onChange(editor.getValue());
      });
    }
  }, [content]);

  return <div ref={editorRef} style={{ border: "1px solid #ccc", height: "300px" }}></div>;
}