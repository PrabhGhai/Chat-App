import React from "react";
import { FaComments } from "react-icons/fa";

const NoChatsSelected = () => {
  return (
    <div className="w-full flex flex-col items-center justify-center h-full text-center px-4 py-10">
      <FaComments className="text-6xl text-indigo-500 mb-4 animate-bounce transition-all" />
      <h2 className="text-2xl font-semibold text-gray-700 mb-2">
        No Chat Selected
      </h2>
      <p className="text-gray-500 max-w-md">
        Select a conversation from the sidebar to start chatting. If there’s
        nothing yet, go ahead and start a new one!
      </p>
    </div>
  );
};

export default NoChatsSelected;
