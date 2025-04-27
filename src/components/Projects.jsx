import React, { useState } from 'react';
import '../styles/Projects.css';
import ProjectsData from './ProjectsData';

function Projects() {
  const [selectedProject, setSelectedProject] = useState(null);

  const openModal = (project) => {
    setSelectedProject(project);
  };

  const closeModal = () => {
    setSelectedProject(null);
  };

  return (
    <section id="projects" className="projects">
      <h2>Projects</h2>
      <div className="project-list">
        {ProjectsData.map((project, index) => (
          <div key={index} className="project-card" onClick={() => openModal(project)}>
            <img src={project.image} alt={project.name} className="project-image" />
            <h3>{project.name}</h3>
          </div>
        ))}
      </div>

      {selectedProject && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <img src={selectedProject.image} alt={selectedProject.name} className="modal-image" />
            <h2>{selectedProject.name}</h2>
            <p>{selectedProject.description}</p>
            <a href={selectedProject.link} target="_blank" rel="noopener noreferrer" className="modal-link">View Project</a>
            <button onClick={closeModal} className="modal-close">Close</button>
          </div>
        </div>
      )}
    </section>
  );
}

export default Projects;
