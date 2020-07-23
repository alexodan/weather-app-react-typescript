import React from "react";
import Highlight, { HighlightItem } from "./Highlight";

export interface HighlightsProps {
  highlights: HighlightItem[];
}

const Highlights: React.FC<HighlightsProps> = ({ highlights }) => {
  return (
    <div>
      <h2 className="text-white text-3xl">Today’s Hightlights</h2>
      {highlights.map((highlight, idx) => (
        <Highlight key={idx} highlight={highlight} />
      ))}
    </div>
  );
};

export default Highlights;
