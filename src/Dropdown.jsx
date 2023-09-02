import React, { useState } from 'react';

function Dropdown() {
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

  return (
    <div>
      <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
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