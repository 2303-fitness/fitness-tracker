import React, { useState } from "react";
import { addActivityToRoutine } from "../api";

const AddActivity = ({ routineId, isLoggedIn, currentUser, routine }) => {
  const [activityId, setActivityId] = useState("");
  const [count, setCount] = useState("");
  const [duration, setDuration] = useState("");

  const handleAddActivity = async () => {
    if (isLoggedIn && currentUser) {
      try {
        const token = localStorage.getItem("token");
        await addActivityToRoutine(
          routineId,
          activityId,
          count,
          duration,
          token
        );
      } catch (error) {
        console.error("Failed to add activity:", error);
      }
    } else {
      window.alert("Please sign in to add an activity to this routine!");
    }
  };

  return (
    <>
      <form>
        <input
          type="text"
          placeholder="Activity ID"
          value={activityId}
          onChange={(event) => setActivityId(event.target.value)}
        />
        <input
          type="number"
          placeholder="Count"
          value={count}
          onChange={(event) => setCount(event.target.value)}
        />
        <input
          type="number"
          placeholder="Duration"
          value={duration}
          onChange={(event) => setDuration(event.target.value)}
        />
        <button onClick={handleAddActivity}>Add Activity</button>
      </form>
    </>
  );
};

export default AddActivity;
