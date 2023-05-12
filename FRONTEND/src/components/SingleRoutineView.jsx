import React from "react";
import { useNavigate } from "react-router-dom";

const SingleRoutineView = (props) => {
  const {isLoggedin, currentUser, routines, setSelectedRoutines} = props;
  const navigate = useNavigate;
  const checkCreatorId = (currUser, creatorId) => {
    return currUser === creatorId;
  }
  return (
    <>
    <div className="single-routine">
      <h2>{routines.name}</h2>
      <p>Creator Name: {routines.creatorId}</p>
      <p>Goal: {routines.goal}</p>
      <p>Activities: {routines.activities}</p>

      {isLoggedin ? 
        checkCreatorId(currentUser, routines.creatorId) ?
          <button
            onClick={() => {
              setSelectedRoutines(routines);
              navigate("/EditRoutine");
            }}
          >
            
            Edit
          </button>
        : 
          <button
            onClick={() => {
              setSelectedRoutines(routines);
              navigate("/CreateActivity");
            }}
          >
            
            Add Activity
          </button>
        
       : <br></br>
        }
    </div>
    </>
  );
};

export default SingleRoutineView;
