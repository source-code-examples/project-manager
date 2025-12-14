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
          key={project.id}
          id={project.id}
          title={project.project}
          description={project.description}
          tags={project.tags}
          onUpdate={() => onUpdate(project)}
          onDelete={onDelete}
        />
      ))}
    </section>
  );
};

export default ProjectColumn;
