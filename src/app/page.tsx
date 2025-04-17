"use client";

import React, { useState } from "react";
import TabBar from "../app/components/TabBar";
import CodeEditor from "../app/components/codeEditor";

const languages = [
  { label: "JavaScript", value: "javascript" },
  { label: "Python", value: "python" },
  { label: "HTML", value: "htmlmixed" },
  { label: "CSS", value: "css" },
  { label: "Markdown", value: "markdown" },
  { label: "XML", value: "xml" },
];

export default function Home() {
  const [openFiles, setOpenFiles] = useState<{ id: string; name: string }[]>([]);
  const [activeFileId, setActiveFileId] = useState<string | null>(null);
  const [fileContents, setFileContents] = useState<{ [fileId: string]: string }>({});
  const [selectedLanguage, setSelectedLanguage] = useState<string>("javascript");

  const handleTabClick = (fileId: string) => {
    setActiveFileId(fileId);
  };

  const handleCloseTab = (fileId: string) => {
    setOpenFiles((prev) => prev.filter((file) => file.id !== fileId));
    setActiveFileId((prev) => (prev === fileId ? null : prev));
  };

  const handleAddTab = () => {
    const newFileId = `file-${Date.now()}`;
    setOpenFiles((prev) => [...prev, { id: newFileId, name: `Untitled-${prev.length + 1}` }]);
    setFileContents((prev) => ({ ...prev, [newFileId]: "" }));
    setActiveFileId(newFileId);
  };

  const handleContentChange = (newContent: string) => {
    if (activeFileId) {
      setFileContents((prev) => ({ ...prev, [activeFileId]: newContent }));
    }
  };

  return (
    <div>
      <header className="p-4 bg-black-200 flex justify-between items-center">
        <button onClick={handleAddTab} className="px-4 py-2 bg-blue-500 text-white rounded">
          New Tab
        </button>
        <select
          value={selectedLanguage}
          onChange={(e) => setSelectedLanguage(e.target.value)}
          className="px-4 py-2 border rounded bg-blue-900 text-white"
        >
          {languages.map((lang) => (
            <option key={lang.value} value={lang.value}>
              {lang.label}
            </option>
          ))}
        </select>
      </header>
      <TabBar
        openFiles={openFiles}
        activeFileId={activeFileId}
        onTabClick={handleTabClick}
        onCloseTab={handleCloseTab}
      />
      <main className="p-4">
        {activeFileId && (
          <CodeEditor
            content={fileContents[activeFileId] || ""}
            language={selectedLanguage}
            onChange={handleContentChange}
          />
        )}
      </main>
    </div>
  );
}