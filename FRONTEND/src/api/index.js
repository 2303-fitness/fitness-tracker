// BASE
const BASE = 'http://fitnesstrac-kr.herokuapp.com/api'

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
  
      const result= await response.json();
  console.log(result)
      if (result.user) {
        const { token, message } = result;
        localStorage.setItem('token', token);
        return { token, message };
      }
      if (result.error) {
      
        return result;
      }
     return;
    } catch (error) {
      console.error(error);
    }
  };
  /*{user: {…}, message: "you're signed up!", token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6OTk4L…QwNX0.XBb7xz7u0XB1y8OaLXvSCq9dEx_gAnokvn5a5Yl-JaY'}
message
: 
"you're signed up!"
token
: 
"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6OTk4LCJ1c2VybmFtZSI6InN1cGVyc3dvbGUiLCJpYXQiOjE2ODM4MTk2MDUsImV4cCI6MTY4NDQyNDQwNX0.XBb7xz7u0XB1y8OaLXvSCq9dEx_gAnokvn5a5Yl-JaY"
user
: 
{id: 998, username: 'superswole'}
[[Prototype]]
: 
Object */
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
  
      const result= await response.json();

      if (result.username) {
        const { token, message } = result;
        localStorage.setItem('token', token);
        return { token, message };
      } console.log(result.error)
      if (result.error) {
      
        return result;
      }
     
    return;
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
export const myRoutines = async (user, token) =>{
  try{
    const response = await fetch(`${BASE}/users/${user}/routines`,{
      method: 'GET',
      headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
  });
  const result = await response.json();
  console.log(result);
  return result;
    } catch (error){
      console.error(error);
    }
  }
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