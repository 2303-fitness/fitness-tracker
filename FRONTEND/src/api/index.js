// BASE
const BASE = "http://fitnesstrac-kr.herokuapp.com/api";

// REGISTER USER
export const registerUser = async (userObject) => {
  try {
    const response = await fetch(`${BASE}/users/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userObject),
    });

    const result = await response.json();
    console.log(result);
    if (result.user) {
      const { token, message, userObject } = result;
      localStorage.setItem("token", token);
      return { token, message, userObject };
    }
    if (result.error) {
      return result;
    }
    console.log(token);
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
    const response = await fetch(`${BASE}/users/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userObject),
    });

    const result = await response.json();
    console.log(result);
    if (result.user) {
      const { token, user } = result; // Update to use 'user' instead of 'userObject'
      localStorage.setItem("token", token);
      return { token, user }; // Return the 'user' object along with the 'token'
    }
    if (result.error) {
      return result;
    }
    const token = result.token;
    console.log(token);
    return;
  } catch (error) {
    console.error(error);
  }
};
//USER- GET ME
export const getMe = async (token) => {
  console.log(token);
  try {
    const response = await fetch(`${BASE}/users/me`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const result = await response.json();
    console.log(result);
    return result;
  } catch (err) {
    console.error(err);
  }
};
// CALL GET ME
export const callGetMe = async () => {
  try {
    const response = await fetch(`${BASE}/users/me`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    const result = await response.json();
    console.log(result);
    return result;
  } catch (error) {
    console.error(error);
  }
};
//GET ROUTINES BY USER
export const myRoutines = async (user, token) => {
  try {
    const response = await fetch(`${BASE}/users/${user}/routines`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const result = await response.json();
    console.log(result);
    return result;
  } catch (error) {
    console.error(error);
  }
};
//GET ALL ACTIVITIES
export async function getAllActivities() {
  try {
    const response = await fetch(`${BASE}/activities`);
    const activitiesList = await response.json();
    console.log(activitiesList);
    return activitiesList;
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
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(newActivityObj),
    });
    const result = await response.json();
    console.log("The result of createActivity is: ", result);
    return result;
  } catch (err) {
    console.error(err);
  }
};

//GET AVTIVITIES BY ROUTINE
export const routineActivities = async (Id) => {
  try {
    const response = await fetch(`${BASE}/activities/${Id}/routines`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const result = await response.json();
    console.log(result);
    return result;
  } catch (error) {
    console.error(error);
  }
};
// GET ALL ROUTINES
export async function getAllRoutines() {
  try {
    const response = await fetch(`${BASE}/routines`);
    const routinesList = await response.json();
    console.log(routinesList);
    return routinesList;
  } catch (error) {
    throw error;
  }
}
//GET ROUTINE BY ID
export const getRoutineById = async (id, token) => {
  try {
    const response = await fetch(`${BASE}/routines/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const result = await response.json();
    console.log(result);
    return result;
  } catch (error) {
    console.error(error);
  }
};
//CREATE ROUTINES
export const createRoutine = async (newRoutineObj, token) => {
  try {
    const response = await fetch(`${BASE}/routines`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(newRoutineObj),
    });
    const result = await response.json();
    console.log("The result of createRoutine is: ", result);
    return result;
  } catch (err) {
    console.error(err);
  }
};

//EDIT ROUTINE
export const updateRoutine = async (id, routine) => {
  try {
    const response = await fetch(`${BASE}/routines/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(routine),
    });
    const result = await response.json();
    return result;
  } catch (err) {
    console.error(err);
  }
};

//ADD ACTIVITY TO ROUTINE
export const addActivityToRoutine = async (
  routineId,
  activityId,
  count,
  duration,
  token
) => {
  try {
    const response = await fetch(`${BASE}/routines/${routineId}/activities`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        activityId,
        count,
        duration,
      }),
    });

    const result = await response.json();
    console.log(result);
    return result;
  } catch (err) {
    console.error(err);
  }
};
//DELETE ROUTINES
export const deleteRoutine = async (id, token) => {
  try {
    const response = await fetch(`${BASE}/routines/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
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
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const result = await response.json();
    console.log(result);
    return result;
  } catch (error) {
    console.error(error);
  }
};
