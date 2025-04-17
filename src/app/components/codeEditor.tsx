import React, { useEffect, useRef, useState } from "react";
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

interface Issue {
  line: number;
  description: string;
}

export default function CodeEditor({ content, language, onChange }: CodeEditorProps) {
  const editorRef = useRef<HTMLDivElement>(null);
  const editorInstance = useRef<CodeMirror.Editor | null>(null);
  const [issues, setIssues] = useState<Array<Issue>>([]);
  const [feedback, setFeedback] = useState<string>("");

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

  const addIssue = (line: number, description: string) => {
    setIssues((prev) => [...prev, { line, description }]);
  };

  const submitFeedback = () => {
    console.log("User Feedback:", feedback);
    setFeedback("");
    alert("Thank you for your feedback!");
  };

  return (
    <div>
      <div ref={editorRef} style={{ border: "1px solid #ccc", height: "300px" }}></div>

      {/* Issue Tracker */}
      <div className="mt-4">
        <h3>Issue Tracker</h3>
        <button
          onClick={() => addIssue(1, "Example issue on line 1")}
          className="px-4 py-2 bg-red-500 text-white rounded"
        >
          Add Issue
        </button>
        <ul className="mt-2">
          {issues.map((issue, index) => (
            <li key={index} className="text-red-600">
              Line {issue.line}: {issue.description}
            </li>
          ))}
        </ul>
      </div>

      {/* Code Review */}
      <div className="mt-4">
        <h3>Code Review</h3>
        <p className="text-gray-600">Highlight sections in the editor and add comments for review.</p>
        {/* Placeholder for future inline commenting feature */}
      </div>

      {/* UI Feedback */}
      <div className="mt-4">
        <h3>UI Feedback</h3>
        <textarea
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
          placeholder="Share your feedback about the editor..."
          className="w-full p-2 border rounded"
        />
        <button
          onClick={submitFeedback}
          className="mt-2 px-4 py-2 bg-blue-500 text-white rounded"
        >
          Submit Feedback
        </button>
      </div>
    </div>
  );
}