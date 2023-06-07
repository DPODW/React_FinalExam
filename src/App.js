import logo from './logo.svg';
import './App.css';
import Header from './mainFunction/Header'
import Update from './mainFunction/Update'
import Create from './mainFunction/Create'
import Nav from './mainFunction/Nav'
import Article from './mainFunction/Article'
import { useState } from 'react';


function App() {


  const [mode, setMode] = useState('WELCOME');
  const [id, setId] = useState(null);
  const [nextId, setNextId] = useState(4);

  const [topics,setTopics] = useState([
    {id:1, title:'더미 데이터', body:'본문'}
  ]);

  let content = null;
  let contextControl = null;

  if(mode==="WELCOME"){
    content = <Article title="익명 게시판 입니다." body="익명에 기대어 남을 비난하지 맙시다."></Article>
    contextControl = <>
      <a class="btn" href="/create" onClick={event => {
        event.preventDefault();
        setMode('CREATE');
      }}>글 작성</a>
    </>
  }
  else if (mode === 'READ') {
    let title, body = null;
    for (let i = 0; i < topics.length; i++) {
      if (topics[i].id === id) {
        title = topics[i].title;
        body = topics[i].body;
      }
    }
    content = <Article title={title} body={body}></Article>
    contextControl = <>
      <a class="btn" href="/create" onClick={event => {
        event.preventDefault();
        setMode('CREATE');
      }}>글 작성</a>
      <a class="btn" href={'/update/' + id} onClick={event => {
        event.preventDefault();
        setMode('UPDATE');
      }}>글 수정</a>
      <input class="btn" type="button" value="글 삭제" onClick={() => {
        const newTopics = []
        for (let i = 0; i < topics.length; i++) {
          if (topics[i].id !== id) {
            newTopics.push(topics[i]);
          }
        }
        setTopics(newTopics);
        setMode('WELCOME');
      }} />
    </>
  }
  else if (mode === 'CREATE') {
    content = <Create onCreate={(_title,_body)=>{
      const newTopic = {id:nextId, title:_title,body:_body};
      const newTopics = [...topics];
      newTopics.push(newTopic);
      setTopics(newTopics);
      setMode('READ');
      setId(nextId);
      setNextId(nextId+1);
    }}></Create>
  }
  else if (mode === 'UPDATE') {
    let title, body = null;
    for (let i = 0; i < topics.length; i++) {
      if (topics[i].id === id) {
        title = topics[i].title;
        body = topics[i].body;
      }
    }
    content = <Update title={title} body={body} onUpdate={(title,body)=>{
      const newTopics = [...topics]
      const updatedTopic = {id:id, title:title, body:body}
      for(let i=0;i<newTopics.length;i++){
        if(newTopics[i].id===id){
          newTopics[i] = updatedTopic;
          break;
        }
      }
      setTopics(newTopics);
      setMode('READ');

    }}></Update>    
  }

  return (
    <>
      <Header title="학교 게시판" onChangeMode={() => {
        setMode('WELCOME');
      }}></Header>

      <div class="background">
        <div class="titlebar">글 목록</div>
        <div class="content">

          <Nav topics={topics} onChangeMode={(_id) => {
            setMode('READ');
            setId(_id);
          }}></Nav>
        </div>

        <div class="titlebar">글 내용</div>
        <div class="content">
          {content}
            <div class="btncover">
              {contextControl}
            </div>
        </div>

        <hr/>
        <aside>
    <h2>사이드바</h2> api 하나 하면 될듯
          <ul>
            <li>메뉴 항목 1</li>
            <li>메뉴 항목 2</li>
            <li>메뉴 항목 3</li>
          </ul>
        </aside>

        <footer className="footer">
          <div className="container">
            <div className="footer-content">
              <p>&copy; 1912031 문태진 캡스톤 기말 과제</p>
            </div>
          </div>
        </footer>
      </div>
      
    </>
  );
}

export default App;