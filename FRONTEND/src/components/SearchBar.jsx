import React, { useState } from "react";
const SearchBar = (props) => {
  const { routinesList, setReturnedRoutinesList } = props;

  const [searchForRoutine, setSearchForRoutine] = useState("");
  const searchAllRoutines = (routinesArray, searchTerm) => {
    const result = routinesArray.filter((routines) =>
      routines.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    return result;
  };

  return (
    <div className="search-bar">
      <label htmlFor="searchroutines">Search for a Routine:</label>
      <input
        type="text"
        name="searchroutines"
        value={searchForRoutine}
        placeholder="Search By Name"
        onChange={(event) => setSearchForRoutine(event.target.value)}
      />
      <button
        onClick={() => {
          console.log(searchForRoutine);
          console.log(routinesList);
          let filteredList = searchAllRoutines(routinesList, searchForRoutine);
          console.log(filteredList);
          setReturnedRoutinesList(filteredList);
        }}
        className="search-button"
      >
        Search
      </button>
    </div>
  );
};

export default SearchBar;
