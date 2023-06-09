import "./register.scss";
import {useState, useRef} from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../../helper";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");

  const navigate = useNavigate();
  const emailRef = useRef();
  const passwordRef = useRef();
  const usernameRef = useRef();
  
  const handleStart = ()=> {
    setEmail(emailRef.current.value)
  };

  const handleFinish = async(e)=> {
    e.preventDefault();
    setUsername(usernameRef.current.value)
    setPassword(passwordRef.current.value)
    //console.log(email+" "+password+" "+username)
    try{
      if(username && password){
        await axios.post(`${API_URL}/auth/register`, {email, username, password});
        navigate("/login");
      }
      
    } catch(err){
      console.log(err);
    }
    
  };

  const handleSignIn = (e) => {
    e.preventDefault();
    navigate("/login");
  }

  return (
    <div className="register">
        <div className="top">
        <div className="wrapper">
          <img
            className="logo"
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/2560px-Netflix_2015_logo.svg.png"
            alt=""
          />
         <button className="loginButton" onClick={(e) => handleSignIn(e)}>Sign In</button>
         </div>
       </div>
        <div className="container">
           <h1>Unlimited movies, TV </h1>
            <h1>shows, and more.</h1>
           <h2>Watch anywhere. Cancel anytime.</h2>
           <p>
           Ready to watch? Enter your email to create or 
           restart your membership.
           </p>
            {!email ? (
              <div className="input">
                <input type="email" placeholder="email address" ref={emailRef}/>
                <button className="registerButton" onClick={handleStart}>
                  Get Started
                </button>
              </div>
             ) : (
             <form className="input">
             <input type="username" placeholder="username" ref={usernameRef}/>
             <input type="password" placeholder="password" ref={passwordRef}/>
             <button className="registerButton" onClick={handleFinish}>Start</button>
          </form>
           )}
        </div>
    </div>
  )
}
