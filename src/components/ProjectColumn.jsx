import React from "react";
import "./ProjectColumn.css";
import ProjectCard from "./ProjectCard";

const ProjectColumn = ({
  title,
  icon,
  projects,
  status,
  onUpdate,
  onDelete,
}) => {
  const filteredProjects = projects.filter(
    (project) => project.status === status
  );

  return (
    <section className="project_column">
      <h2 className="project_column_heading">
        <img className="project_column_icon" src={icon} alt="" />
        {title}
      </h2>

      {filteredProjects.map((project) => (
        <ProjectCard
          key={project.id} // unique ID
          id={project.id} // pass for deletion
          title={project.project}
          description={project.description}
          tags={project.tags}
          onUpdate={() => onUpdate(project)} // pass full project
          onDelete={onDelete}
        />
      ))}
    </section>
  );
};

export default ProjectColumn;
