"use client"

import { useState, useEffect, useMemo } from 'react';
import '../globals.css';
import './Projects.css';
import projectsData from './projects.json';
import tags_dict from '../components/tags_dict.jsx';
import ProjectItem from '../components/ProjectItem.jsx';
import Tag from '../components/Tag.jsx';

function Projects() {

  const [projects, setProjects] = useState([]);

  useEffect(() => {
    
    setProjects(projectsData.projects)

  }, []);

  const [selectedTags, setSelectedTags] = useState(Object.keys(tags_dict));

  const handleCheckboxChange = (event) => {
    const { value, checked } = event.target;
    if (checked) {
      setSelectedTags(prevItems => [...prevItems, value]);
    } else {
      setSelectedTags(prevItems => prevItems.filter(item => item !== value));
    }
  };

  const showProject = (project, index) => {
    for (const tag of project.tags) {
      if (selectedTags.includes(tag)) {
        return <ProjectItem project={project} key={index} />;
      }
    }
    return;
  };
  
  return (
    <>
      <div className="tag-select-container">
        <h2>Select Tags</h2>
        {Object.keys(tags_dict).map((tag, index) => (
          <li key={index} className="tag-select-item">
            <input type="checkbox" value={tag} onChange={handleCheckboxChange} defaultChecked />
            <Tag key={index} tag={tags_dict[tag]}/>
          </li>
        ))}
      </div>
      <section className="projects-container">
        {projects.map((project, index) => showProject(project, index))}
      </section>
    </>
  );
}

export default Projects;
