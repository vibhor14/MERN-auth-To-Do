import React, { useState, useEffect} from "react";
import { useNavigate, Navigate } from 'react-router-dom';
import Axios from "axios";
import Logout from "./Logout";
import ToDoList from "./ToDoList";
function Secret(){
    const navigate = useNavigate();
    const [privateData, setPrivateData] = useState("");
    const [loading, setLoading] = useState(true);
    useEffect ( () => {
        
       Axios({
            method: "GET",
            withCredentials: true,
            url: "http://localhost:4000/user",
          }).then((res) => {
            
            const userdata = res.data;
            setPrivateData(userdata);
            setLoading(false);
    }); 
        
},[] );
//console.log(privateData);
if(loading){
    return null;
}
return privateData?(
  <div>
    <p>HI {privateData.name} </p> 
    <br></br>
    <ToDoList data={privateData}/>
    <Logout />
    <br></br><br></br>
  </div>
):(<Navigate to="/login"  />);

}

export default Secret;