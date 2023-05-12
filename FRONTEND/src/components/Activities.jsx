// import SearchBar from "./SearchBar";
import React from "react";
import SingleActivityView from "./SingleActivityView";
import { useState } from "react";
import CreateActivity from "./CreateActivity";
import { NavLink, useNavigate } from "react-router-dom";

const Activities = (props) => {
    const {activitiesList, setActivitiesList,isLoggedIn,currentUser,token} = props;
    const navigate = useNavigate();

    const handleClick = (logged) =>
    {
        if(logged)
        {
            navigate('/CreateActivity');
        }
        else{
            window.alert('Please sign in to add a Activity!');
        }
    }
   
    return (
        <>  <h2> Activities</h2>
            <button
            onClick={() => {handleClick(isLoggedIn)}}
            > Add New Activity</button>
            {/* <SearchBar activitiesList = {activitiesList} setReturnedActivitiesList = {setReturnedActivitiesList} />
            */}
            {
                activitiesList.length  ?
                <div id='all-activities-container'>
                {activitiesList.map((activity,index) => {
                    return (
                    <div key={index}>
                        <SingleActivityView  activity = {activity} isLoggedIn = {isLoggedIn} currentUser ={currentUser}/>
                    </div>
                    );
                    })}
                </div>
                : 
                <div id='all-activities-container'>
                {activitiesList.map((activity,index) => {
                return (
                <div key={index}>
                    <SingleActivityView  activity = {activity} isLoggedIn ={isLoggedIn} currentUser ={currentUser} />
                </div>
                );
                })}
            </div>
            }

        </>
    );
}

export default Activities;

