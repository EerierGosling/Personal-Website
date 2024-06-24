import React, { useState, useEffect } from 'react';
import './App.css';
import projectsData from './projects.json';
import tags_dict from './tags_dict.jsx';
import ProjectItem from './ProjectItem.jsx';
import TagSelect from './TagSelect.jsx';
import Tag from './Tag.jsx';
import Snowfall from './Snowfall.jsx';

function App() {

  // const [projects, setProjects] = useState([]);

  // useEffect(() => {
  //   setProjects(projectsData.projects);
  // }, []);

  // const [selectedTags, setSelectedTags] = useState(Object.keys(tags_dict));

  // const handleCheckboxChange = (event) => {
  //   const { value, checked } = event.target;
  //   if (checked) {
  //     setSelectedTags(prevItems => [...prevItems, value]);
  //   } else {
  //     setSelectedTags(prevItems => prevItems.filter(item => item !== value));
  //   }
  // };

  // const showProject = (project) => {
  //   console.log(project.tags);
  //   for (const tag of project.tags) {
  //     console.log(tag);
  //     console.log(selectedTags)
  //     if (selectedTags.includes(tag)) {
  //       console.log("something");
  //       return <ProjectItem project={project}/>;
  //     }
  //   }
  //   return;
  // };
  
  return (
  //   <div className="App">
  //   <div className="tag-select-container">
  //     <h2>Select Tags</h2>
  //     <ul>
  //       {Object.keys(tags_dict).map((tag, index) => (
  //         <li key={index}><input type="checkbox" value={tag} onChange={handleCheckboxChange} defaultChecked /> <Tag key={index} tag={tags_dict[tag]}/> </li>
  //       ))}
  //     </ul>
  //   </div>
  //   <div className="projects-container">
  //     {projects.map((project, index) => showProject(project))}
  //   </div>
  // </div>

  <div className="App">
      <Snowfall />
  </div>
  );
}

export default App;
