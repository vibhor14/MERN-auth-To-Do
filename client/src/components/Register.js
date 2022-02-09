import React,{useState} from "react";
import Axios from "axios";
import { useNavigate } from 'react-router-dom';
function Register(){
    
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    function registerDetail(event){
        //console.log(email);
        Axios({
          method: "POST",
          data: {
            userName: name,
            userEmail: email,
            userPassword: password
          },
          withCredentials: true,
          url: "http://localhost:4000/register"
        }).then((res) => {
          console.log(res);
          navigate("/login");
        });
        setName("");
        setPassword("");
        setEmail("");
        event.preventDefault();
      };
    return(
        <div>
            <h3>Register</h3>
           <form>
                <div className="mb-3">
                    <label for="exampleFullName" className="form-label" >Full Name</label>
                    <input type="text" className="form-control" id="exampleFullName" onChange={ (e) => setName(e.target.value)} value={name} />
                </div>
                <div className="mb-3">
                    <label for="exampleInputEmail1" className="form-label" >Email address</label>
                    <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" onChange={ (e) => setEmail(e.target.value)} value={email} />
                </div>
                <div class="mb-3">
                    <label for="exampleInputPassword1" className="form-label">Password</label>
                    <input type="password" className="form-control" id="exampleInputPassword1" onChange={ (e) => setPassword(e.target.value)} value={password}/>
                </div>
                
                <button type="submit" className="btn btn-primary" onClick={registerDetail}>Submit</button>
            </form>                     
        </div>
    );
}
export default Register;
