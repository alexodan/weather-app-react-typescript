import React from "react";
import Highlight, { HighlightItem } from "./Highlight";

export interface HighlightsProps {
  highlights: HighlightItem[];
}

const Highlights: React.FC<HighlightsProps> = ({ highlights }) => {
  console.log(highlights);
  return (
    <div className="highlights max-w-5xl min-w-2/3 w-2/3">
      <h2 className="text-white text-3xl mt-16 mb-6">Today’s Hightlights</h2>
      <div className="grid grid-cols-2 gap-10">
        {highlights.map((highlight, idx) => (
          <Highlight key={idx} highlight={highlight} />
        ))}
      </div>
    </div>
  );
};

export default Highlights;
