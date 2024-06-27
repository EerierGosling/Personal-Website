import React, { useState, useEffect } from 'react';
import './App.css';
import projectsData from './projects.json';
import tags_dict from './tags_dict.jsx';
import ProjectItem from './ProjectItem.jsx';
import TagSelect from './TagSelect.jsx';
import Tag from './Tag.jsx';
import Snowfall from './Snowfall.jsx';
import github_logo from './assets/github_logo.svg';
import itchio_logo from './assets/itchio_logo.svg';
import devpost_logo from './assets/devpost_logo.svg';

function App() {

  const [projects, setProjects] = useState([]);

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
    console.log(project.tags);
    for (const tag of project.tags) {
      console.log(tag);
      console.log(selectedTags)
      if (selectedTags.includes(tag)) {
        console.log("something");
        return <ProjectItem project={project}/>;
      }
    }
    return;
  };
  
  return (
    <div className="App">
      <div style={{position: "fixed", zIndex: -1, margin:0, padding:0, transform:"translateY(-100px)"}}>
        <Snowfall />
      </div>

      <div className="title" style={{height:"100vh", textAlign:"left", color:"white", margin:"100px"}}>
        <h1>Hi!</h1>
        <h1>I'm Sofia Egan</h1>
        <p style={{width:"40vw"}}>I'm a high schooler in the Boston area. I go to a lot of hackathons and I ran my own this spring, called <a href="https://hacknight.co">HacKnight</a>! <br></br>I enjoy working with a diverse range of platforms and technologies, including apps, websites, games, and random ML and data analysis projects in Python.</p>
        <div>
          <a href="https://github.com/EerierGosling"> <img className="social-link" src={github_logo}></img> </a>
          <a href="https://eeriergosling.itch.io/"> <img className="social-link" src={itchio_logo}></img> </a>
          <a href=" https://devpost.com/segan"> <img className="social-link" src={devpost_logo}></img> </a>
        </div>
      </div>
    
      <div className="tag-select-container" style={{zIndex: 1}}>
        <h2>Select Tags</h2>
        <ul>
          {Object.keys(tags_dict).map((tag, index) => (
            <li key={index}><input type="checkbox" value={tag} onChange={handleCheckboxChange} defaultChecked /> <Tag key={index} tag={tags_dict[tag]}/> </li>
          ))}
        </ul>
      </div>
      <div className="projects-container">
        {projects.map((project, index) => showProject(project))}
      </div>
    </div>
  );
}

export default App;
