import { useNavigate } from "react-router-dom";
import TagPicker from "../atoms/TagPicker";

/**
 * SearchBar — reusable organism
 *
 * Props:
 *  query        {string}   – controlled value
 *  setQuery     {fn}       – setter
 *  onSearch     {fn}       – called when arrow button is clicked (optional)
 *  placeholder  {string}   – input placeholder (optional)
 */
const SearchBar = ({
  query,
  setQuery,
  onSearch,
  placeholder = "Escribe algo para buscar...",
}) => {
  const handleSearch = () => {
    if (onSearch) onSearch(query);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleSearch();
  };

  return (
    <div className="relative mb-6">
      <div className="relative mb-6">
        <input
          type="text"
          className="block w-full pl-8 pr-24 py-4 border border-negro-txt rounded-sm leading-5 bg-gris-bg2 placeholder-griso-prf focus:outline-none focus:ring-2 focus:ring-azul-url focus:border-azul-url sm:text-lg transition duration-150 ease-in-out shadow-sm"
          placeholder={placeholder}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
        />

        {/* Right-side button group */}
        <div className="absolute inset-y-0 right-0 flex items-center">
          {/* Clear button — only visible when there's text */}
          {query && (
            <button
              onClick={() => setQuery("")}
              className="flex items-center justify-center px-3 text-griso-prf hover:text-negro-txt cursor-pointer transition-colors"
              aria-label="Limpiar búsqueda"
            >
              <svg
                className="h-5 w-5"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10l-4.293-4.293a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          )}

          {/* Search arrow button */}
          <button
            onClick={handleSearch}
            className="flex items-center justify-center h-full border border-negro-txt rounded-sm bg-gris-bg2 hover:bg-gray-200 transition-colors rounded-r-sm px-8 cursor-pointer"
            aria-label="Buscar"
          >
            <svg
              className="h-5 w-5 text-gray-600"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </button>
          
        </div>

        
        
      </div>
      <TagPicker onTagSelect={(tag) => setQuery(q => q ? `${q} ${tag}` : tag)} />
    </div>
  );
};

export default SearchBar;
