import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getRoutineById, updateRoutine } from "../api";

const EditRoutine = () => {
  const { id } = useParams();
  const [routine, setRoutine] = useState(null);
  const [name, setName] = useState("");
  const [goal, setGoal] = useState("");

  useEffect(() => {
    const fetchRoutine = async () => {
      try {
        const routine = await getRoutineById(id);
        setRoutine(routine);
        setName(routine.name);
        setGoal(routine.goal);
      } catch (error) {
        console.error(error);
      }
    };

    fetchRoutine();
  }, [id]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const updatedRoutine = await updateRoutine(id, { name, goal });
      setRoutine(updatedRoutine);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Edit Routine</h2>

      <label htmlFor="name">Name:</label>
      <input
        id="name"
        type="text"
        value={name}
        onChange={(event) => setName(event.target.value)}
      />

      <label htmlFor="goal">Goal:</label>
      <input
        id="goal"
        type="text"
        value={goal}
        onChange={(event) => setGoal(event.target.value)}
      />

      <button type="submit">Submit</button>
    </form>
  );
};

export default EditRoutine;
