import React, { useState, useEffect } from "react";
import "./ProjectForm.css";
import Tag from "./Tag";

const ProjectForm = ({
  setProjects,
  editProject,
  setEditProject,
  handleUpdate,
}) => {
  const [projectData, setProjectData] = useState({
    project: "",
    status: "upcoming",
    tags: [],
    description: "", // NEW field
  });

  // Pre-fill form when editing
  useEffect(() => {
    if (editProject) {
      setProjectData({
        project: editProject.project,
        status: editProject.status,
        tags: editProject.tags,
        description: editProject.description || "", // load description if exists
      });
    }
  }, [editProject]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProjectData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Prevent empty or whitespace-only names
    if (!projectData.project.trim()) {
      alert("Project name cannot be empty!");
      return;
    }

    // Update existing project
    if (editProject) {
      handleUpdate({ ...projectData, id: editProject.id });
      setEditProject(null);

      // Scroll to top immediately after update
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    } else {
      // Create new project
      const newProject = {
        ...projectData,
        id: Date.now(),
      };
      setProjects((prev) => [...prev, newProject]);
    }

    // Reset form
    setProjectData({
      project: "",
      status: "upcoming",
      tags: [],
      description: "",
    });
  };

  return (
    <header className="app_header">
      <form onSubmit={handleSubmit} id="projectForm">
        <input
          type="text"
          className="project_input"
          placeholder="Enter Project Name"
          name="project"
          onChange={handleChange}
          value={projectData.project}
        />

        <textarea
          className="project_textarea"
          placeholder="Enter project description..."
          name="description"
          onChange={handleChange}
          value={projectData.description}
        />

        <div className="project_form_bottom_line">
          <div className="project_tags">
            {[
              "HTML",
              "CSS",
              "JavaScript",
              "Java",
              "Python",
              "React",
              "Angular",
              "Vue",
              "MongoDB",
              "ExpressJS",
              "NodeJS",
              "PHP",
              "Spring",
              "Django",
              "MySQL",
            ].map((tag) => (
              <Tag
                key={tag}
                tagName={tag}
                selectTag={(t) =>
                  setProjectData((prev) =>
                    prev.tags.includes(t)
                      ? { ...prev, tags: prev.tags.filter((x) => x !== t) }
                      : { ...prev, tags: [...prev.tags, t] }
                  )
                }
                selectedTag={projectData.tags.includes(tag)}
              />
            ))}
          </div>

          <div className="project_actions">
            <select
              className="project_status"
              name="status"
              value={projectData.status}
              onChange={handleChange}
            >
              <option value="upcoming">Upcoming</option>
              <option value="inProgress">In Progress</option>
              <option value="completed">Completed</option>
            </select>
            <button type="submit" className="project_submit">
              {editProject ? "Update Project" : "Add Project"}
            </button>
          </div>
        </div>
      </form>
    </header>
  );
};

export default ProjectForm;

// ---------------------------------------------------------------------
