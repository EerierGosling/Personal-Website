"use client"

import { useState, useEffect, useRef } from 'react';
import '../globals.css';
import projectsData from './projects.json';
import tags_dict from '../components/tags_dict.jsx';
import ProjectItem from '../components/ProjectItem.jsx';
import Tag from '../components/Tag.jsx';

function Projects({scrollY, viewHeight, viewWidth}) {

  const [projects, setProjects] = useState([]);

  const tagWidth = 200;

  const minColumnWidth = 400;

  const remainingWidth = viewWidth - tagWidth;

  const numColumns = Math.floor(remainingWidth / minColumnWidth);

  const projectsContainerRef = useRef(null);

  useEffect(() => {
    setProjects(projectsData.projects);
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

  const showProject = (project) => {
    for (const tag of project.tags) {
      if (selectedTags.includes(tag)) {
        return <ProjectItem project={project}/>;
      }
    }
    return;
  };
  
  return (
    <div className="Home" style={{display: "flex", flexDirection: "column", justifyContent: "center"}}>
      <div className="all-content" style={{position:"absolute", top: "20vh", left: 0}}>    
        <div className="tag-select-container" style={{ position: "sticky", top: 0, zIndex: 1, marginLeft:"30px", width: 200}}>
          <h2>Select Tags</h2>
          <ul>
            {Object.keys(tags_dict).map((tag, index) => (
              <li key={index}><input type="checkbox" value={tag} onChange={handleCheckboxChange} defaultChecked /> <Tag key={index} tag={tags_dict[tag]}/> </li>
            ))}
          </ul>
        </div>
        <div className="projects-container" ref={projectsContainerRef} style={{gridTemplateColumns: `repeat(${numColumns}, 1fr)`}}>
          {projects.map((project, index) => showProject(project))}
        </div>
      </div>
    </div>
  );
}

export default Projects;
