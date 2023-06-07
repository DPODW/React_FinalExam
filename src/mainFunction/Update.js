import React from "react";
import '../App.css';
import { useState } from 'react';

function Update(props) {
    const [title, setTitle] = useState(props.title);
    const [body, setBody] = useState(props.body);
  
    return <article>    
      <h2>글 수정</h2> 
      <form onSubmit={event=>{
        event.preventDefault();
        const title = event.target.title.value;
        const body = event.target.body.value;
        if (!title || !body) {
          alert('제목과 내용을 입력해주세요.'); 
          return;
        }
        props.onUpdate(title,body)
      }}>
        <p>제목</p>
        <p><input type="text" name="title" maxLength={20}  value={title} onChange={event=>{
          setTitle(event.target.value);
        }}/></p>
        <p>내용</p>
        <p><textarea name="body" maxLength={50}  value={body} onChange={event=>{
          setBody(event.target.value);
        }}></textarea></p>
        <p><input type="submit" value="수정 완료"/></p>     
      </form>
      
    </article>
  }
  export default Update;