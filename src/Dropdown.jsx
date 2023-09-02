import React, { useState } from 'react';

function Dropdown({ onValueChange}) {
  const [selectedCategory, setSelectedCategory] = useState('');

  const contentTypes = [
    "Essays",
    "Blogs",
    "Articles",
    "Reviews",
    "Short Stories",
    "Poems",
    "Reports",
    "Guides",
    "Tutorials",
    "Interviews"
  ];

  const handleChange = (e) => {
    onValueChange(e.target.value);
    setSelectedCategory(e.target.value);
  }

  return (
    <div>
      <select value={selectedCategory} onChange={handleChange}>
        <option value="" disabled>Select content type</option>
        {contentTypes.map(type => (
          <option key={type} value={type}>{type}</option>
        ))}
      </select>
      {selectedCategory && <p>You selected: {selectedCategory}</p>}
    </div>
  );
}

export default Dropdown;