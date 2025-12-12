import React, { useState } from "react";
import "./ProjectCard.css";
import Tag from "./Tag.jsx";
import removeIcon from "../assets/remove.png";
import editIcon from "../assets/edit.png";

const ProjectCard = ({ id, title, description, tags, onUpdate, onDelete }) => {
  const [descriptionExpanded, setDescriptionExpanded] = useState(false);

  const shortDescription = description && description.slice(0, 50) + "...";

  return (
    <article className="project_card">
      <p className="project_text">{title}</p>

      <p className="project_description">
        {descriptionExpanded ? description : shortDescription}
      </p>

      {description.length > 50 && (
        <button
          className="project_read_more"
          onClick={() => setDescriptionExpanded(!descriptionExpanded)}
        >
          {descriptionExpanded ? "Read less" : "Read more"}
        </button>
      )}

      <div className="project_card_bottom_line">
        <div className="project_card_tags">
          {tags.map((tag) => (
            <Tag key={tag} tagName={tag} selectedTag={true} />
          ))}
        </div>

        <div>
          <div className="project_edit" onClick={onUpdate}>
            <img src={editIcon} className="edit_icon" alt="Edit" />
          </div>
          <div className="project_remove" onClick={() => onDelete(id)}>
            <img src={removeIcon} className="remove_icon" alt="Delete" />
          </div>
        </div>
      </div>
    </article>
  );
};

export default ProjectCard;
