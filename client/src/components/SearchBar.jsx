import React from 'react';

const SearchBar = ({ search, setSearch }) => {
  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  const handleClearSearch = () => {
    setSearch(''); 
  };

  return (
    <div className="flex items-center space-x-2 mb-4">
      <input
        type="text"
        placeholder="Search transactions..."
        value={search}
        onChange={handleSearchChange}
        className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" // Tailwind CSS for styling
      />
      <button
        onClick={handleClearSearch}
        className="px-4 py-2 text-white bg-red-500 rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400" // Tailwind CSS for button styling
      >
        Clear
      </button>
    </div>
  );
};

export default SearchBar;
