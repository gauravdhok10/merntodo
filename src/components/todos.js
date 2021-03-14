import './todo.css'
import React, { useState, useContext, useEffect } from "react";
import { CredentialsContext } from "../App";
import { v4 as uuidv4 } from "uuid";

export default function Todos() {
  const [todos, setTodos] = useState([]);
  const [todoText, setTodoText] = useState("");
  const [credentials] = useContext(CredentialsContext);
  const [filter, setFilter] = useState("uncompleted");

  const persist = (newTodos) => {
    fetch(`http://localhost:4000/todos`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Basic ${credentials.username}:${credentials.password}`,
      },
      body: JSON.stringify(newTodos),
    }).then(() => {});
  };

  useEffect(() => {
     function fetchT() { 
        return fetch(`http://localhost:4000/todos`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Basic ${credentials.username}:${credentials.password}`,
      },
    }) 
      .then((response) => response.json())
      .then((todos) => setTodos(todos));
    };
    fetchT();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const addTodo = (e) => {
    e.preventDefault();
    if (!todoText) return;
    const newTodo = { id: uuidv4(), checked: false, text: todoText };
    const newTodos = [...todos, newTodo];
    setTodos(newTodos);
    setTodoText("");
    persist(newTodos);
  };

  const toggleTodo = (id) => {
    const newTodoList = [...todos];
    const todoItem = newTodoList.find((todo) => todo.id === id);
    todoItem.checked = !todoItem.checked;
    setTodos(newTodoList);
    persist(newTodoList);
  };
  const delTodo=(id)=> {
    const newTodoList = [...todos];
    const newTodoList2 = newTodoList.filter((todo) => todo.id !== id);
   setTodos(newTodoList2); persist(newTodoList2);
  }

  const getTodos = () => {
    return todos.filter((todo) =>
      filter === "completed" ? todo.checked : !todo.checked
    );
  };

  const changeFilter = (newFilter) => {
    setFilter(newFilter);
  };

  return (
    <div className="todo">
      <div className="todo_select">
        <select value={filter} onChange={(e) => changeFilter(e.target.value)}>
          <option value="completed">--COMPLETED--</option>
          <option value="uncompleted">--UNCOMPLETED--</option>
        </select>
      </div>  
      <div className="main_todo">
      {getTodos().map((todo) => (
        <div className="todo_item" key={todo.id}>
          <input
            checked={todo.checked}
            onChange={() => toggleTodo(todo.id)}
            type="checkbox"
          />
          
          <label>{todo.text}</label>
          <button type="button" onClick={() => delTodo(todo.id)}>Delete</button>
        </div>
      ))}
      </div>
      <form className="add_new" onSubmit={addTodo}>
        <input
          value={todoText}
          onChange={(e) => setTodoText(e.target.value)}
          type="text"
        ></input>
        <button type="submit">Add</button>
      </form>
    </div>
  );
}