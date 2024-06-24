import React, { useState } from 'react';
import Tag from './Tag';
import tags_dict from './tags_dict.jsx';

const TagSelect = ({ onSelectedOptionsChange }) => {
  /// Define state to hold selected items
  const [selectedItems, setSelectedItems] = useState(Object.keys(tags_dict));

  // Function to handle checkbox change
  const handleCheckboxChange = (event) => {
    const { value, checked } = event.target;
    if (checked) {
      setSelectedItems(prevItems => [...prevItems, value]);
    } else {
      setSelectedItems(prevItems => prevItems.filter(item => item !== value));
    }
    onSelectedOptionsChange(selectedItems);
  };

  return (
    <div style={{textAlign: "left"}}>
      <h2>Multi-Select List</h2>
      <ul>
        {Object.keys(tags_dict).map((tag, index) => (
          <li key={index} style={{listStyleType: "none"}}><input type="checkbox" value={tag} onChange={handleCheckboxChange} defaultChecked /> <Tag key={index} tag={tags_dict[tag]}/> </li>
        ))}
      </ul>
      <h3>Selected Items:</h3>
      <ul>
        {selectedItems.map(item => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  );
};

export default TagSelect;
