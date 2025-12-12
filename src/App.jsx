import React, { useState, useEffect } from "react";
import "./App.css";
import ProjectForm from "./components/ProjectForm";
import ProjectColumn from "./components/ProjectColumn";
import upcomingIcon from "./assets/upcoming.png";
import inProgressIcon from "./assets/in-progress.png";
import completedIcon from "./assets/completed-2.png";
import logo from "./assets/web.png";
import Footer from "./components/Footer";

// Secure retrieval from localStorage
const oldProjects = localStorage.getItem("projects");

let initialProjects = [];
if (oldProjects) {
  try {
    initialProjects = JSON.parse(oldProjects);
  } catch (error) {
    console.error("Error parsing projects from localStorage:", error);
    initialProjects = [];
  }
}

const App = () => {
  const [projects, setProjects] = useState(initialProjects);
  const [editProject, setEditProject] = useState(null);

  useEffect(() => {
    localStorage.setItem("projects", JSON.stringify(projects));
  }, [projects]);

  const handleUpdate = (updatedProject) => {
    const newProjects = projects.map((project) =>
      project.id === updatedProject.id ? updatedProject : project
    );
    setProjects(newProjects);
  };

  const handleDelete = (projectId) => {
    const newProjects = projects.filter((project) => project.id !== projectId);
    setProjects(newProjects);
  };

  return (
    <div className="app">
      <nav className="navbar">
        <div className="navbar_logo">
          <img src={logo} alt="Web Logo" width={35} />
        </div>
        <h1 className="navbar_title">Web Project Manager</h1>
        <ul className="navbar_menu">
          <li>Home</li>
          <li>About</li>
          <li>Settings</li>
        </ul>
      </nav>

      <ProjectForm
        setProjects={setProjects}
        editProject={editProject} // pass for editing
        setEditProject={setEditProject} // pass for editing
        handleUpdate={handleUpdate} // pass for editing
      />
      <main className="app_main">
        <ProjectColumn
          title="Upcoming"
          icon={upcomingIcon}
          projects={projects}
          status="upcoming"
          onUpdate={setEditProject}
          onDelete={handleDelete}
        />
        <ProjectColumn
          title="In Progress"
          icon={inProgressIcon}
          projects={projects}
          status="inProgress"
          onUpdate={setEditProject}
          onDelete={handleDelete}
        />
        <ProjectColumn
          title="Completed"
          icon={completedIcon}
          projects={projects}
          status="completed"
          onUpdate={setEditProject}
          onDelete={handleDelete}
        />
      </main>
      <Footer />
    </div>
  );
};

export default App;
