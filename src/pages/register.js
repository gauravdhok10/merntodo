import React, { useState, useContext } from "react";
import { useHistory,Link } from "react-router-dom";
import { CredentialsContext } from "../App";
import { handleErrors } from "./login";
import './register.css'

export default function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [, setCredentials] = useContext(CredentialsContext);

  const register = (e) => {
    e.preventDefault();
    fetch(`http://localhost:4000/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        password,
      }),
    })
      .then(handleErrors)
      .then(() => {
        setCredentials({
          username,
          password,
        });
        history.push("/");
      })
      .catch((error) => {
        setError(error.message);
      });
  };

  const history = useHistory();

  return (
    <div>
    <h2 className="logo"><Link to="/">ToDOit</Link></h2>
    <div className="main">
   
      <div className="left1">
    
      </div>
      <div className="right">
        <h1 className="head_log">Register</h1>
        {error && <span style={{ color: "red" }}>{error}</span>}
      <form onSubmit={register}>
      <input
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
        />
        <br />
        <input
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
        <br />
        <button className="login" type="submit">Register</button>
      </form>
      <div className="down">
          <hr />
          <button className="register1"> <Link className="register" to="/login">Have an Account</Link></button>
          <br /><br /><br />
          TODO app <br />
          A MERN REACT Web App <br />
          @gauravdhok
        </div>
        
        </div>
        </div>
     
    </div>
  );
}