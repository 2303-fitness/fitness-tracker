import React from "react";
const EditActivity = () => { 



    
    return (
        <>
        <h2> Edit Activity</h2>
        
            <form id='edit-activity-form'>
            
            <span><label htmlFor="name">Name</label><input type ="text" name ="name" value ="" placeholder="Name" required/></span>
            <span><label>Description</label><input type ="text" name ="description" value ="" placeholder="Description" required/></span>
            <span><label>Duration</label><input type ="text" name ="duration" value ="" placeholder="Duration" required/></span>
            <span><label>Count</label><input type ="text" name ="count" value ="" placeholder="Count" required/></span>
           
            <button id ='save-activity'>SAVE</button>
            </form>         
       
        
        </>
        
    );

}
export default EditActivity;