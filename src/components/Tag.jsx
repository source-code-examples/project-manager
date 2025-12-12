import React from "react";
import "./Tag.css";
import tags from "../config/tags.js";

const Tag = ({ tagName, selectTag, selectedTag }) => {
  return (
    <button
      className="tag"
      type="button"
      onClick={() => selectTag(tagName)}
      style={selectedTag ? tags[tagName] : tags.default}
    >
      {tagName}
    </button>
  );
};

export default Tag;
