import React from "react";
import { useNavigate } from "react-router-dom";

const UserRoutines = ({ routinesList, currentUser, isLoggedIn }) => {
  const navigate = useNavigate();

  console.log(routinesList);
  console.log(currentUser);

  const userCreatedRoutines = routinesList.filter(
    (routine) => routine.creatorId === currentUser.id
  );

  console.log(userCreatedRoutines);

  return (
    <>
      {userCreatedRoutines.map((routine, index) => (
        <div className="single-routine" key={index}>
          <h3>{routine.name}</h3>
          <p>Description: {routine.goal}</p>
          <p>Creator: {routine.creatorName}</p>
          {isLoggedIn && currentUser.id === routine.creatorId ? (
            <>
              <button onClick={() => navigate(`/EditRoutine/${routine.id}`)}>
                Edit
              </button>
              <button>Delete</button>
            </>
          ) : null}
        </div>
      ))}
    </>
  );
};

export default UserRoutines;
