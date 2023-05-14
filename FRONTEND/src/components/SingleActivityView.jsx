import React from "react";
import { useNavigate } from "react-router-dom";

const SingleActivityView = ({
  activity,
  isLoggedIn,
  currentUser,
  setSelectedActivity,
}) => {
  const navigate = useNavigate();

  if (!activity) {
    return null;
  }

  return (
    <div className="single-activity">
      <h3>{activity.name}</h3>
      <p>Description: {activity.description}</p>
      <p>Duration: {activity.duration}</p>
      <p>Count: {activity.count}</p>
      {isLoggedIn && currentUser === activity.creatorId ? (
        <button onClick={() => setSelectedActivity(activity)}>Edit</button>
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

export default SingleActivityView;
