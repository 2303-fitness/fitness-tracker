import React from "react"
import Routines from "./Routines";
const Profile = (props) => {
    const {routinesList, setRouinesList, userRoutines, setUserRoutines, currentUser, selectedRoutines, isLoggedIn, setSelectedRoutines} = props;

    
    return(
        <>
        { isLoggedIn ?
        <div className="myRoutines"><h1>My Routines</h1>
         {userRoutines.map((routines, index) => {
                return (
                <div className="routine-box" key={index}>
                    <Routines currentUser = {currentUser} userRoutines = {userRoutines}  routineId = {routines.id}/>
                </div>
         );
        
        })} 

        </div>
        
            :
            <>
            <h2>Please Log In!</h2></>
            };
        </>
    );
}

export default Profile;
