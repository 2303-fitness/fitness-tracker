import React from "react";
import SingleActivityView from "./SingleActivityView";
import { useNavigate } from "react-router-dom";

const Activities = ({ activitiesList, isLoggedIn, currentUser }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (isLoggedIn) {
      navigate("/CreateActivity");
    } else {
      window.alert("Please sign in to add an activity!");
    }
  };

  return (
    <>
      <h2>Activities</h2>

      {isLoggedIn && <button onClick={handleClick}>Add New Activity</button>}

      <div id="all-activities-container">
        {activitiesList.map((activity, index) => (
          <SingleActivityView
            key={index}
            activity={activity}
            isLoggedIn={isLoggedIn}
            currentUser={currentUser}
          />
        ))}
      </div>
    </>
  );
};

export default Activities;
