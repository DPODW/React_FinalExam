import React from "react";
import '../App.css';
export default Header;

function Header(props) {
    return <header>
      <h1><a href="/" onClick={(event)=>{
        event.preventDefault();
        props.onChangeMode();
      }}>
      <h5>School Board</h5>{props.title}</a></h1>
    </header>
  }