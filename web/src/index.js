import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Analysis from './analysis/Analysis';
import ToDoList from './toDoList/todolist';
import Navbar from './navbar/navbar';
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <React.StrictMode>
    <Navbar />
    <App />
    <Analysis />
    <ToDoList />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
