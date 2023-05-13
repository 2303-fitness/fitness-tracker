import React from "react";
import Routines from "./Routines";

const Profile = (props) => {
  const {
    routinesList,
    setRoutinesList,
    userRoutines,
    setUserRoutines,
    currentUser,
    selectedRoutines,
    isLoggedIn,
    setSelectedRoutines,
  } = props;
  console.log(userRoutines);
  return (
    <>
      {isLoggedIn ? (
        <div className="myRoutines">
          <h1>My Routines</h1>
          {userRoutines.map((routine, index) => {
            return (
              <div className="routine-box" key={index}>
                <userRoutines
                  currentUser={currentUser}
                  routinesList={routinesList}
                  setRoutinesList={setRoutinesList}
                  routine={routine}
                  setSelectedRoutines={setSelectedRoutines}
                  isLoggedIn={isLoggedIn}
                />
              </div>
            );
          })}
        </div>
      ) : (
        <>
          <h2>Please Log In!</h2>
        </>
      )}
    </>
  );
};

export default Profile;
