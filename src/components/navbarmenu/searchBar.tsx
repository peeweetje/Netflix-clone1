import * as React from "react";
import "../app/App.css";

export interface IsearchProps {
  onChange: any;
  searchQuery?: string;
  onKeyUp?: any;
}

const SearchBar: React.FC<IsearchProps> = ({
  searchQuery,
  onKeyUp,
  onChange,
}) => {
  return (
    <form id="Search" className="Search">
      <input
        onChange={onChange}
        value={searchQuery}
        onKeyUp={onKeyUp}
        type="search"
        placeholder="Search for a title..."
      />
    </form>
  );
};

export default SearchBar;
