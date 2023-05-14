import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addActivityToRoutine } from "../api";

const SingleRoutineView = ({
  routine,
  isLoggedIn,
  currentUser,
  setSelectedRoutine,
}) => {
  const navigate = useNavigate();
  const [activityId, setActivityId] = useState("");
  const [count, setCount] = useState("");
  const [duration, setDuration] = useState("");

  const handleAddActivity = async () => {
    console.log("isLoggedIn:", isLoggedIn);
    console.log("currentUser:", currentUser);
    console.log("routine.creatorId:", routine.creatorId);
    if (isLoggedIn && currentUser === routine.creatorId) {
      try {
        const token = localStorage.getItem("token");
        await addActivityToRoutine(
          routine.id,
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
    <div className="single-routine">
      <h3>{routine.name}</h3>
      <p>Description: {routine.goal}</p>
      <p>Creator: {routine.creatorName}</p>
      <button onClick={handleAddActivity}>Add Activity</button>
      {isLoggedIn && currentUser === routine.creatorId ? (
        <>
          <button onClick={() => setSelectedRoutine(routine)}>Edit</button>
          <button>Delete</button>
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
        </>
      ) : (
        <button
          onClick={() => {
            navigate("/EditRoutine");
          }}
        >
          Edit
        </button>
      )}
    </div>
  );
};

export default SingleRoutineView;
