import React, { useEffect, useState } from "react";
import { getAllRoutines, deleteRoutine } from "../api";
import { useNavigate } from "react-router-dom";

const Profile = ({
  currentUser,
  isLoggedIn,
  token,
  setRoutinesList,
  routinesList,
  selectedRoutine,
  setSelectedRoutine,
}) => {
  const [userCreatedRoutines, setUserCreatedRoutines] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchUserRoutines = async () => {
      try {
        const routines = await getAllRoutines();
        const filteredRoutines = routines.filter(
          (routine) => routine.creatorId === currentUser.id
        );

        setUserCreatedRoutines(filteredRoutines);
      } catch (error) {
        console.error(error);
      }
    };

    fetchUserRoutines();
  }, [currentUser.id]);
  console.log(userCreatedRoutines);

  const handleDeleteRoutine = async (routineToDelete) => {
    await deleteRoutine(routineToDelete.id, token);
    const updatedRoutines = userCreatedRoutines.filter(
      (routine) => routine.id !== routineToDelete.id
    );
    setUserCreatedRoutines(updatedRoutines);
    let allRoutines = await getAllRoutines();
    setRoutinesList(allRoutines);
    navigate("/Profile");
  };
  /* only updates user created routines and not routineslist... 
  doesnt delete from database and reappears when page is refreshed*/
  return (
    <>
      {isLoggedIn ? (
        <div className="myRoutines">
          <h1>My Routines</h1>
          <ul>
            {userCreatedRoutines.map((routine, index) => (
              <li key={index}>
                <h3>{routine.name}</h3>
                <p>Description: {routine.goal}</p>
                <p>Creator: {routine.creatorName}</p>
                <button
                  onClick={() => handleDeleteRoutine(routine)}
                  className="delete-button"
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <div className="myRoutines">
          <h1>My Routines</h1>
          <ul>
            {routinesList.map((routine, index) => (
              <li key={index}>
                <h3>{routine.name}</h3>
                <p>Description: {routine.goal}</p>
                <p>Creator: {routine.creatorName}</p>
                <button>Delete</button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
};

export default Profile;
