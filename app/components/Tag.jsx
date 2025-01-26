import './Tag.css';

const Tag = ({ tag }) => {
  const darkerColor = darkenColor(tag.color);
  return (
    <div className="tag-container" style={{ backgroundColor: tag.color}}>
      <p className="tag-text" style={{color:darkerColor}}>{tag.name}</p>
    </div>
  );
};

function darkenColor(color) {
  // Parse the hexadecimal color string
  let hex = color.replace('#', '');
  let r = parseInt(hex.substring(0, 2), 16);
  let g = parseInt(hex.substring(2, 4), 16);
  let b = parseInt(hex.substring(4, 6), 16);

  // Reduce each RGB component by a certain percentage
  const percent = 50; // Adjust as needed
  r = Math.floor(r * (1 - percent / 100));
  g = Math.floor(g * (1 - percent / 100));
  b = Math.floor(b * (1 - percent / 100));

  // Convert back to hexadecimal format
  return '#' + (16777216 | b | (g << 8) | (r << 16)).toString(16).slice(1);
}

export default Tag;