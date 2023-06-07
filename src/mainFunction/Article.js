import React from "react";
import '../App.css';
export default Article;

function Article(props) {
    return <article>
      <h2>{props.title}</h2>
      {props.body}
    </article>
  }