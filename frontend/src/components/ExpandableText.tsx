import React, { useState } from "react";

interface ExpandableTextProps {
  text: string;
  limit?: number;
}

const ExpandableText: React.FC<ExpandableTextProps> = ({
  text,
  limit = 70,
}) => {
  const [expanded, setExpanded] = useState(false);

  if (text.length <= limit) {
    return <span>{text}</span>;
  }

  return (
    <span
      style={{ cursor: "pointer", color: "blue", textDecoration: "underline" }}
      onClick={() => setExpanded(!expanded)}
      title={expanded ? "Clique para esconder" : "Clique para expandir"}
    >
      {expanded
        ? text
        : `Clique para ver todo o texto.`}
    </span>
  );
};

export default ExpandableText;
