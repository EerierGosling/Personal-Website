import './ProjectItem.css';
import Tag from './Tag.jsx';
import tags_dict from './tags_dict.jsx';

const ProjectItem = ({ project }) => {
  return (
    <div className="container">
      <h2>{project.name}</h2>
      {project.note && <h3 style={{marginTop: 0}}>{project.note}</h3>}
      {project.links && (project.links.map((link, index) => <a key={index} href={link.url}>{link.name}</a>))}
      <p>{project.description}</p>
      <div>
        {project.tags.map((tag, index) => <Tag key={index} tag={tags_dict[tag]}/>)}
      </div>
    </div>
  );
};

export default ProjectItem;