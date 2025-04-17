import React from "react";

interface TabBarProps {
  openFiles: { id: string; name: string }[];
  activeFileId: string | null;
  onTabClick: (fileId: string) => void;
  onCloseTab: (fileId: string) => void;
}

export default function TabBar({ openFiles, activeFileId, onTabClick, onCloseTab }: TabBarProps) {
  return (
    <div className="flex border-b bg-gray-100">
      {openFiles.map((file) => (
        <div
          key={file.id}
          className={`px-4 py-2 cursor-pointer ${
            activeFileId === file.id ? "bg-white border-t border-l border-r" : ""
          }`}
          onClick={() => onTabClick(file.id)}
        >
          {file.name}
          <button
            className="ml-2 text-red-500"
            onClick={(e) => {
              e.stopPropagation();
              onCloseTab(file.id);
            }}
          >
            ✕
          </button>
        </div>
      ))}
    </div>
  );
}