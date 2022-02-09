import React from "react";
import { Link } from "react-router-dom";
function Home(){

    return(
        <div>
            <h1>HOME screen</h1>
            <Link to="/register">
                <button  type="button" className="btn btn-primary">REGISTER</button>
            </Link> 
            <Link to="/login">
                <button  type="button" className="btn btn-primary">Login</button>
            </Link> 
        </div>
        
    );
}
export default Home;