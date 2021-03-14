import './welcome.css'
import React, { useContext } from "react";
import {Link} from "react-router-dom";
import { CredentialsContext } from "../App";
import Todos from "../components/todos";


export default function Welcome() {
    const [credentails, setCredentials] = useContext(CredentialsContext);
    const logout = () => {
      setCredentials(null);
    };
    
    return (
        <div className="welcome">
            <nav>
                <ul>
                    <li className="logo"><Link to="/">ToDOit</Link></li>
                    <li className="nametag"> {credentails && credentails.username}</li>
                    <li className="logout"> {credentails && <button className="logoutbutton" onClick={logout}>Logout</button>}</li>
                </ul>
            </nav>
         <div className="home">
          <div className="homeright">
          {!credentails && 
          <div className="home3">
            <h2>Why to use ?</h2>
          There's nothing wrong with a paper to-do list, but going digital has many benefits. Paper is fine if you enjoy writing by hand, crossing off tasks in ink or pencil, and drawing arrows all over the place when deadlines and priorities change. A to-do list app lets you do all that much more efficiently, dragging and dropping tasks to reorder them, changing a priority or due date with one click, attaching a note to a task with additional thoughts. In many ways, a good to-do app is the ultimate productivity app.
          </div>}
          {!credentails &&  
          <div className="h">
          <div className="home1">
         <Link to="/register">Register</Link>
          </div>
          <div className="home2">
          <Link to="/login">Login</Link>
          </div>
          <footer>GitHub : <a href="github.com/gauravdhok10/">@gauravdhok10</a></footer>
          </div>}
          {credentails && <Todos />}
          
          </div>
          </div>
        </div>
      );
  }
  