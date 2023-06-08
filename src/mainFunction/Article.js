import React from "react";
import '../App.css';
export default Article;

function Article(props) {
    return <article>
      <h3>{props.title}</h3>
    <a> {props.body}</a>
    </article>
  }