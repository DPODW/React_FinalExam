import React from "react";
import '../App.css';
export default Header;

function Header(props) {
    return <header>
      <h1><a href="/" onClick={(event)=>{
        event.preventDefault();
        props.onChangeMode();
      }}>{props.title}</a></h1>
    </header>
  }