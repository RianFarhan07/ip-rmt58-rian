import React from "react";

const Search = () => {
  return (
    <div>
      <form onSubmit={handleSearch} className="relative max-w-lg">
        <input
          type="text"
          placeholder="Search for recipes, ingredients, or cuisines..."
          className="w-full py-3 px-4 pr-12 rounded-button bg-white text-text-primary focus:outline-none focus:ring-2 focus:ring-accent"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button
          type="submit"
          className="absolute right-2 top-1/2 transform -translate-y-1/2 p-2 text-primary-dark hover:text-primary"
        >
          <FiSearch size={20} />
        </button>
      </form>
    </div>
  );
};

export default Search;
