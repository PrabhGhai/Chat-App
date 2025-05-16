import React from "react";

const SideBarSkeleton = () => {
  return (
    <aside className="h-full w-20 lg:w-72 border-r border-base-300 flex flex-col">
      <div className="border-b border-base-300 w-full p-5">
        <div className="flex items-center gap-2 animate-pulse">
          <div className="bg-gray-300 rounded-full w-6 h-6" />
          <div className="bg-gray-300 rounded w-24 h-4 hidden lg:block" />
        </div>
      </div>

      <div className="overflow-y-auto w-full py-3 space-y-4 px-4">
        {[...Array(6)].map((_, idx) => (
          <div key={idx} className="flex items-center gap-4 animate-pulse">
            <div className="w-12 h-12 bg-gray-300 rounded-full" />
            <div className="hidden lg:block flex-1 space-y-2">
              <div className="w-3/4 h-4 bg-gray-300 rounded" />
              <div className="w-1/2 h-3 bg-gray-200 rounded" />
            </div>
          </div>
        ))}
      </div>
    </aside>
  );
};

export default SideBarSkeleton;
