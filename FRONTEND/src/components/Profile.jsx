import React, { useEffect, useState } from "react";
import { getAllRoutines } from "../api";

const Profile = ({ currentUser, isLoggedIn }) => {
  const [userCreatedRoutines, setUserCreatedRoutines] = useState([]);

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
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <h2>Please Log In!</h2>
      )}
    </>
  );
};

export default Profile;
