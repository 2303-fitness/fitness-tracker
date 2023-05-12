// import React from "react";
// import { useNavigate } from "react-router-dom";
// import { routineActivities } from "../api";

// const SingleActivityView = (props) => {
//   const {isLoggedin, currentUser, activities,} = props;
//   const navigate = useNavigate;
  
//   return (
//     <>
//     <div className="single-activity">
//       <h2>{activities.name}</h2>
//       <p>Description: {activities.description}</p>
//       <p>Duration: {activities.duration}</p>
//       <p>Count: {activities.count}</p>

      
//           <button
//             onClick={() => {
             
//               navigate("/EditRoutine");
//             }}
//           >
            
//             Edit
//           </button>
//         : 
//           <button
//             onClick={() => {
              
//               navigate("/CreateActivity");
//             }}
//           >
            
//             Add Activity
//           </button>
        
//        : <br></br>
    
//     </div>
//     </>
//   );
// };

// export default SingleActivityView;

import React from "react";
import { useNavigate } from "react-router-dom";

const SingleActivityView = ({ activity, isLoggedIn, currentUser, setSelectedActivity }) => {
    const navigate = useNavigate;
  return (
    <div className="single-activity">
      <h3>{activity.name}</h3>
      <p>Description: {activity.description}</p>
      <p>Duration: {activity.duration}</p>
      <p>Count: {activity.count}</p>
      {isLoggedIn && currentUser === activity.creatorId ? (
        <button onClick={() => setSelectedActivity(activity)}>Edit</button>
      ) : (
        <button onClick={() => {
            navigate("/EditRoutine");
         }}>Edit</button>
      )}
    </div>
  );
};

export default SingleActivityView;