"use client";

import React, { useState } from "react";
import TabBar from "../app/components/TabBar";
import CodeEditor from "../app/components/codeEditor";

export default function Home() {
  const [openFiles, setOpenFiles] = useState<{ id: string; name: string }[]>([]);
  const [activeFileId, setActiveFileId] = useState<string | null>(null);
  const [fileContents, setFileContents] = useState<{ [fileId: string]: string }>({});

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
      <header className="p-4 bg-gray-200">
        <button onClick={handleAddTab} className="px-4 py-2 bg-blue-500 text-white rounded">
          New Tab
        </button>
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
            onChange={handleContentChange}
          />
        )}
      </main>
    </div>
  );
}