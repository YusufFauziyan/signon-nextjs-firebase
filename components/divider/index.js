import React from "react";

function Divider({ label }) {
  return (
    <div className="relative flex items-center">
      <div className="flex-grow border-t border-gray-400"></div>
      <span className={`flex-shrink ${label && "mx-4"} text-gray-400`}>
        {label}
      </span>
      <div className="flex-grow border-t border-gray-400"></div>
    </div>
  );
}

export default Divider;
