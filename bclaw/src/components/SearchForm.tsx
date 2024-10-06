import React from "react";
import { Select, TextField } from "@bcgov/design-system-react-components";
import SearchIcon from "../assets/icons/SearchIcon";

interface SearchFormProps {
  query: string;
  setQuery: (query: string) => void;
  jury: string;
  handleKeyEvent: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  handleSelect: (e: React.Key) => void;
}

const SearchForm: React.FC<SearchFormProps> = ({
  query,
  setQuery,
  jury,
  handleKeyEvent,
  handleSelect,
}) => (
  <>
    <div className="search-container">
      <TextField
        label="Enter a term to search the titles"
        type="search"
        className="input-container"
        size="medium"
        iconLeft={<SearchIcon width="12px" height="12px" />}
        isRequired
        minLength={1}
        maxLength={20}
        value={query}
        onChange={setQuery}
        onKeyUp={handleKeyEvent}
        aria-describedby="search-instructions"
      />
    </div>
    <div className="dropdown-container">
      <Select
        label="Select Jurisdiction"
        size="medium"
        items={[
          { id: "statreg", label: "Public Statutes and Regulations" },
          { id: "psl", label: "Private, Special and Local Statutes and Regulations" },
        ]}
        isRequired
        defaultSelectedKey="statreg"
        onSelectionChange={handleSelect}
      />
    </div>
  </>
);

export default SearchForm;