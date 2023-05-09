// BASE
const BASE = 'http://fitnesstrac-kr.herokuapp.com/api/'

// REGISTER USER
export const registerUser = async (userObject) => {
    try {
      const response = await fetch(`${BASE}/users/register`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(userObject),
        }
      );
  
      const { success, error, data } = await response.json();
  
      if (success) {
        const { token, message } = data;
        localStorage.setItem('token', token);
        return { token, message };
      }
      if (!success && !error) {
        const { name, message } = data;
        return { name, message };
      }
      console.log(success, error, data);
    } catch (error) {
      console.error(error);
    }
  };
//LOGIN
export const loginUser = async (userObject) => {
    try {
      const response = await fetch(`${BASE}/users/login`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(userObject),
        }
      );
  
      const { success, error, data } = await response.json();
  
      if (success) {
        const { token, message } = data;
        localStorage.setItem('token', token);
        return { token, message };
      }
      if (!success && !error) {
        const { name, message } = data;
        return { name, message };
      }
      console.log(success, error, data);
    } catch (error) {
      console.error(error);
    }
  };
//USER- GET ME
export const getMe = async (token) => {

    try {
      const response = await fetch(`${BASE}/users/me`, {
          method: 'GET',
          headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
      });
      const result = await response.json();
      console.log(result);
      return result
    } catch (err) {
      console.error(err);
    }
  }
//GET ROUTINES BY USER

//GET ALL ACTIVITIES
export async function getAllActivities() {
    try {
      const response = await fetch(`${BASE}/routines`);
      const activitiesList = await response.json();
      console.log(activitiesList.data.activities);
      return activitiesList.data.activities;
    } catch (error) {
      throw error;
    }
  }
//CREATE ACTIVITY
export const createActivity = async (newActivityObj, token) => {
 
    try {
      
      const response = await fetch(`${BASE}/activities`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(newActivityObj),
      });
      console.log(response);
      const result = await response.json();
      console.log("The result of addNewPost is: ",result);
     
    return result;
    } catch (err) {
      console.error(err);
    }
  }


//GET AVTIVITIES BY ROUTINE

// GET ALL ROUTINES
export async function getAllRoutines() {
    try {
      const response = await fetch(`${BASE}/routines`);
      const routinesList = await response.json();
      console.log(routinesList.data.routines);
      return routinesList.data.routines;
    } catch (error) {
      throw error;
    }
  }
//CREATE ROUTINES
export const createRoutine = async (newRoutineObj, token) => {
 
    try {
      
      const response = await fetch(`${BASE}/routines`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(newRoutineObj),
      });
      console.log(response);
      const result = await response.json();
      console.log("The result of addNewPost is: ",result);
     
    return result;
    } catch (err) {
      console.error(err);
    }
  }

//DELETE ROUTINES
export const deleteRoutine = async (id, token) => {

    try {
      
      const response = await fetch(`${BASE}/routines/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
      });
  
      const result = await response.json();
      console.log(result);
      return result;
    } catch (error) {
      console.error(error);
    }
  };


//DELETE ROUTINE ACTIVITY
export const deleteRoutineActivity = async (id, token) => {

    try {
      
      const response = await fetch(`${BASE}/routineActivities/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
      });
  
      const result = await response.json();
      console.log(result);
      return result;
    } catch (error) {
      console.error(error);
    }
  };