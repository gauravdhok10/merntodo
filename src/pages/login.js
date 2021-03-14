import './login.css';
import React, { useState, useContext } from "react";
import { useHistory ,Link } from "react-router-dom";
import { CredentialsContext } from "../App";

export const handleErrors = async (response) => {
  if (!response.ok) {
    const { message } = await response.json();
    throw Error(message);
  }
  return response.json();
};


export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [, setCredentials] = useContext(CredentialsContext);

  const login = (e) => {
    e.preventDefault();
    fetch(`http://localhost:4000/login`, {
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
     
        <div className="left">
      
        </div>
        <div className="right">
        <h1 className="head_log">Sign In</h1>
      {error && <span style={{ color: "red" }}>{error}</span>}
      <form onSubmit={login}>
        <input  onChange={(e) => setUsername(e.target.value)}   placeholder="Username"/>
        <br />
        <input type="password" onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
        <br />
        <button className="login" type="submit">Login</button>
      </form>
        <div className="down">
          <hr />
          <button className="register1"> <Link className="register" to="/register">Want to Create Account</Link></button>
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