import { Search, X } from "lucide-react";
import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

export default function SearchBar() {
  const [shouldShowSearch, setShouldShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  function handleSearchClick() {
    setShouldShowSearch(false);
  }

  function handleSearchQueryChange(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;
    setSearchQuery(value);

    if (debounceRef.current) clearTimeout(debounceRef.current);

    debounceRef.current = setTimeout(() => {

      if (value) {
        navigate(`/search?q=${encodeURIComponent(value)}`);
      } else {
        navigate("/browse");
      }
    }, 500);
  }

  return (
    <div className="relative flex items-center text-white h-[100%]">
      <div className="absolute right-0 flex items-center">
        <label htmlFor="search-input" className="sr-only">Search</label>
        <input
          id="search-input"
          autoComplete="off"
          type="search"
          placeholder="Titles, people, genres"
          value={searchQuery}
          onChange={handleSearchQueryChange}
          className={`pl-10 py-2 border text-white text-sm placeholder:text-gray-400 focus:outline-none overflow-hidden [&::-webkit-search-cancel-button]:hidden ${
            shouldShowSearch
              ? "w-[calc(100vw-120px)] sm:w-64 border-white/50 focus:border-white bg-[#141414] transition-all duration-400 pr-8"
              : "w-10 border-transparent cursor-pointer"
          }`} 
          onFocus={() => setShouldShowSearch(true)}
          onBlur={handleSearchClick}
          readOnly={!shouldShowSearch}
        />
        <button
          className={`absolute left-2 p-1 ${
            shouldShowSearch ? "" : "pointer-events-none cursor-pointer"
          }`}
          aria-label="Search"
          onClick={handleSearchClick}
        >
          <Search size={24} />
        </button>
        {shouldShowSearch && searchQuery && (
          <button
            className="absolute right-2 p-1 cursor-pointer hover:text-gray-300"
            aria-label="Clear search"
            onMouseDown={(e) => {
              e.preventDefault();
              setSearchQuery("");
              navigate("/browse");
            }}
          >
            <X size={18} />
          </button>
        )}
      </div>
    </div>
  );
}
