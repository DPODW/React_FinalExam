import React from "react";
import '../App.css';
export default Create;


function Create(props) {
    return <article>    
      <h2>글 작성</h2>
      <form onSubmit={event=>{
        event.preventDefault();
        const title = event.target.title.value;
        const body = event.target.body.value;
        if (!title || !body) {
          alert('제목과 내용을 입력해주세요.'); 
          return;
        }
        props.onCreate(title,body)
      }}>
        <p>제목</p>
        <p><input type="text" name="title" maxLength={20}/></p>
        <p>내용</p>
        <p><textarea name="body" maxLength={50}></textarea></p>
        <p><input type="submit" value="작성 완료"/></p>     
      </form>
    </article>
  }