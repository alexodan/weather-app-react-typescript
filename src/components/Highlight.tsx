import React from "react";

export interface HighlightItem {
  name: string;
  value: number;
  unit?: string;
  other?: string;
}

export interface HighlightProps {
  highlight: HighlightItem;
}

const Highlight: React.FC<HighlightProps> = ({ highlight }) => {
  const { name, value, unit, other } = highlight;
  // Use child to refactor display of units and other
  return (
    <div className="h-40 bg-indigo-900 text-gray-100 text-center p-4 flex flex-col justify-around">
      <h4 className="text-l">{name}</h4>
      <h2>
        <span className="text-5xl font-black">{value}</span>
        <span> </span>
        <span className="text-3xl">{unit}</span>
      </h2>
      {other && <h4 className="my-2">{other}</h4>}
    </div>
  );
};

export default Highlight;
