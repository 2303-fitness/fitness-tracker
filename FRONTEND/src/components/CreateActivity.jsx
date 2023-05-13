import React, { useState } from "react";
import { createActivity } from "../api";

const CreateActivity = ({
  currentUser,
  token,
  activitiesList,
  setActivitiesList,
}) => {
  const [activityName, setActivityName] = useState("");
  const [activityDescription, setActivityDescription] = useState("");
  const [activityDuration, setActivityDuration] = useState("");
  const [activityCount, setActivityCount] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    const newActivity = {
      name: activityName,
      description: activityDescription,
      count: activityCount,
      duration: activityDuration,
      creatorId: currentUser,
      isPublic: true,
    };
    const data = await createActivity(newActivity, token);
    setActivitiesList([data.newActivity, ...activitiesList]);
    setActivityName("");
    setActivityDescription("");
    setActivityCount("");
    setActivityDuration("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Activity Name"
        value={activityName}
        onChange={(event) => setActivityName(event.target.value)}
      />
      <input
        type="text"
        placeholder="Activity Description"
        value={activityDescription}
        onChange={(event) => setActivityDescription(event.target.value)}
      />
      <input
        type="text"
        placeholder="Activity Count"
        value={activityCount}
        onChange={(event) => setActivityCount(event.target.value)}
      />
      <input
        type="text"
        placeholder="Activity Duration"
        value={activityDuration}
        onChange={(event) => setActivityDuration(event.target.value)}
      />
      <button type="submit">Create Activity</button>
    </form>
  );
};

export default CreateActivity;
