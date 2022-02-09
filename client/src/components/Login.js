import React, {useState} from "react";
import { useNavigate } from "react-router-dom";
import Axios from "axios";

function Login(){
    const navigate = useNavigate();
    const [loginEmail, setLoginEmail] = useState("");
    const [loginPassword, setLoginPassword] = useState("");

    function loginDetail(event){
        Axios({
         method: "POST",
         data: {
           username: loginEmail,
           password: loginPassword
         },
         withCredentials: true,
         url: "http://localhost:4000/login"
       }).then((res) => {
           console.log("Axios login POST request done");
           const userData = res.data;
           console.log(userData);
           if(userData){
               navigate("/secret");
           }else{
               navigate("/login");
           }
       });
       setLoginPassword("");
       setLoginEmail("");
       event.preventDefault();

     };

    return(
        <div>
            <h3>Login:</h3>
            <form className="mb-3">
                <label htmlFor="exampleFormControlInput1" className="form-label">Email address</label>
                    <input id="exampleFormControlInput1" className="form-control" type="email" placeholder="Enter email" onChange={ (e) => setLoginEmail(e.target.value)} value={loginEmail}></input>
                <label htmlFor="exampleFormControlInput2" className="form-label">Password</label>
                    <input id ="exampleFormControlInput2" className="form-control" type="password" placeholder="Enter password" onChange={ (e) => setLoginPassword(e.target.value)} value={loginPassword}></input>
                <button onClick={loginDetail} className="btn btn-success">LogIn</button>
            </form>
        </div>
    );
}

export default Login;