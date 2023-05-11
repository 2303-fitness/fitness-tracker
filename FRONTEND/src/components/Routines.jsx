import SearchBar from "./SearchBar";
import React from "react";
import SingleRoutineView from "./SingleRoutineView";
import { useState } from "react";
import CreateRoutine from "./CreateRoutine";
import { NavLink, useNavigate } from "react-router-dom";

const Routines = (props) => {
    const {routinesList, setRoutinesList,isLoggedIn,currentUser,token,selectedRoutine,setSelectedRoutine, currentRoutine, setCurrentRoutine} = props;
    const [returnedRoutineList, setReturnedRoutineList] = useState([]);
    const navigate = useNavigate();

    const handleClick = (logged) =>
    {
       // console.log("entering handle click for create post" , isLoggedIn);
        if(logged)
        {
            navigate('/CreateRoutine');
        }
        else{
            window.alert('Please sign in to add a routine!');
        }
    }
   
    return (
        <>  <h2> Routines</h2>
            <button
            onClick={() => {handleClick(isLoggedIn)}}
            > Create New Routine</button>
           
            {
                returnedRoutineList.length  ?
                <div id='all-routines-container'>
                {returnedRoutineList.map((routine,index) => {
                    return (
                    <div key={index}>
                        <SingleRoutineView  routine = {routine} isLoggedIn = {isLoggedIn} currentUser ={currentUser} setSelectedRoutine ={setSelectedRoutine}/>
                    </div>
                    );
                    })}
                </div>
                : 
                <div id='all-routines-container'>
                {routinesList.map((routine,index) => {
                return (
                <div key={index}>
                    <SingleRoutineView  routine = {routine} isLoggedIn = {isLoggedIn} currentUser ={currentUser} setSelectedRoutine ={setSelectedRoutine}/>
                </div>
                );
                })}
            </div>
            }

        </>
    );
}

export default Routines;

