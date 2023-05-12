import React from "react";
const EditRoutine = () => { 



    
    return (
        <>
        <h2> Edit Routine</h2>
        
            <form id='edit-routine-form'>
            
            <span><label htmlFor="name">Name</label><input type ="text" name ="name" value ="" placeholder="Name" required/></span>
            <span><label>Goal</label><input type ="text" name ="goal" value ="" placeholder="Goal" required/></span>
           
            <button id ='save-routine'>SAVE</button>
            </form>         
       
        
        </>
        
    );

}
export default EditRoutine;