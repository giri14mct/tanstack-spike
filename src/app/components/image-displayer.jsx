import React, { useState } from "react";
import Image from "next/image";

export default function ImageDisplayer(props) {
  const [isTooltipVisible, setIsTooltipVisible] = useState(false);

  return (
    <div className="relative">
      <Image
        src=""
        alt={props.data}
        width={40}
        height={40}
        className="flex items-center justify-center m-1 text-center text-white bg-gray-500 rounded-full cursor-pointer"
        onMouseEnter={() => setIsTooltipVisible(true)}
        onMouseLeave={() => setIsTooltipVisible(false)}
      />
      {isTooltipVisible && (
        <span className="absolute p-1 text-center text-white transform -translate-x-1/2 bg-gray-500 rounded bottom-full left-1/2">
          {props.data}
        </span>
      )}
    </div>
  );
}
