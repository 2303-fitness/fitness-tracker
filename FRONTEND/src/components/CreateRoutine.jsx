import React, { useState } from "react";
import { createRoutine } from "../api";

const CreateRoutine = ({
  currentUser,
  token,
  setCreateRoutineFormActive,
  setUserRoutines,
  userRoutines,
}) => {
  const [routineName, setRoutineName] = useState("");
  const [routineGoal, setRoutineGoal] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    const newRoutine = {
      name: routineName,
      goal: routineGoal,
      creatorId: currentUser,
    };
    const data = await createRoutine(newRoutine, token);
    setUserRoutines([data.routine, ...userRoutines]);
    setRoutineName("");
    setRoutineGoal("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Routine Name"
        value={routineName}
        onChange={(event) => setRoutineName(event.target.value)}
      />
      <input
        type="text"
        placeholder="Routine Goal"
        value={routineGoal}
        onChange={(event) => setRoutineGoal(event.target.value)}
      />
      <button type="submit">Create Routine</button>
    </form>
  );
};

export default CreateRoutine;
