import React from "react";

const TruncateString = props => {
  const truncateString = (s, iStart, maxL) => {
    if (s.length <= maxL) return s;
    return s.slice(iStart, maxL - 3) + "...";
  };
  return (
    <>{truncateString(props.initialStr, props.indexStart, props.maxLength)}</>
  );
};
export default TruncateString;
