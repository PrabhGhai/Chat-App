import React from "react";

const MessageSkeleton = () => {
  return (
    <div className="p-4 space-y-4 animate-pulse">
      {[...Array(8)].map((_, idx) => (
        <div
          key={idx}
          className={`flex items-start gap-3 ${
            idx % 2 === 0 ? "justify-start" : "justify-end"
          }`}
        >
          {idx % 2 === 0 && (
            <div className="w-8 h-8 bg-gray-300 rounded-full" />
          )}
          <div
            className={`max-w-xs w-48 sm:w-60 h-5 rounded-lg ${
              idx % 2 === 0 ? "bg-gray-300" : "bg-indigo-200"
            }`}
          />
        </div>
      ))}
    </div>
  );
};

export default MessageSkeleton;
