import React, { useState } from "react";
import Axios from "axios";
function AddArea(props) {
    const [task,setTask] = useState("");
    function handleClick(e){
        // console.log(props.listType);
        // console.log(task);
        props.onAdd(task);
        Axios({
            method: "POST",
            data: {
              task: task,
              typeOfList: props.listType,
              userID: props.userdata.data._id
            },
            withCredentials: true,
            url: "http://localhost:4000/addtask"
          }).then((res) => {
            console.log(res);
          });
        setTask("");
        e.preventDefault();
    }
    return(
        <div>
            <form id="to-do-form">
                <input type="text" placeholder="Enter task" value= {task} onChange={ (e) => setTask(e.target.value)}></input>
                <button type="submit" onClick={handleClick}>Add</button>
            </form>
        </div>
    );
}

export default AddArea;