import React from "react";
import { useNavigate } from "react-router-dom";
import Axios from "axios";

function Logout(){
    const navigate = useNavigate();
    function handleLogout(){
        Axios({
            method: "GET",
            withCredentials: true,
            url: "http://localhost:4000/logout",
          }).then((res) => {
            console.log(res)
            navigate(res.data.redirect);
    }); 
    }
    return(
        <div>
        <br />
        <button className="btn btn-danger" onClick={handleLogout}>Log Out</button>
        </div>
    )
}

export default Logout;