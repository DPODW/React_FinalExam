import logo from './logo.svg';
import './App.css';
import Header from './mainFunction/Header'
import Update from './mainFunction/Update'
import Create from './mainFunction/Create'
import Nav from './mainFunction/Nav'
import Article from './mainFunction/Article'
import CurrentTime from './addFunction/CurrentTime';
import CurrentWeather from './addFunction/CurrentWeather';
import CurrentNews from './addFunction/CurrentNews';
import xchoolImage from './img/ucs.png';
import CurrentCovid from './addFunction/CurrentCovid';
import { useState } from 'react';


function App() {

  const [mode, setMode] = useState('WELCOME');
  const [id, setId] = useState(null);
  const [nextId, setNextId] = useState(4);

  const [topics,setTopics] = useState([
    {id:1, title:'안녕하세요', body:'1912031 문태진 입니다.'}
  ]);

  let content = null;
  let contextControl = null;

  if(mode==="WELCOME"){
    content = <Article title="익명 게시판 입니다."></Article>
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
      <Header  onChangeMode={() => {
        setMode('WELCOME');
      }}>
      </Header>
  
      <div className="background">

        <div className="titlebar">글 목록</div>
        <div className="content">
          <Nav topics={topics} onChangeMode={(_id) => {
            setMode('READ');
            setId(_id);
          }}></Nav>
        </div>
  
        <div className="titlebar">글 내용</div>
        <div className="content">
          {content}
          <div className="btncover">
            {contextControl}
          </div>
        </div>
  
        <hr />
  
        <aside>
          <h3>현재 울산 날씨 입니다.</h3>
          <CurrentWeather />
        </aside>
  
        <hr />
  
        <footer className="footer">
          <div className="container">
            <div className="footer-content">
              <ul>
                <li><a href="https://www.uc.ac.kr/www/?ref=aHR0cHM6Ly93d3cuZ29vZ2xlLmNvbS8%3D" target='_blank'>울산과학대학교 (클릭시 이동)</a></li>
                <li><a href="https://www.uc.ac.kr/computer/" target='_blank'>IT응용기술학부 (클릭시 이동)</a></li>
              </ul>
              <CurrentTime />
              <p>&copy; 1912031 문태진 캡스톤 기말 과제</p>
            </div>
          </div>
        </footer>
      </div>
      

      <div className="News-section">
        <CurrentNews/>
      </div>

      <div className="aa-section">
      {<CurrentCovid/>}
      <div className="image-container">
      <img  src={xchoolImage} alt="School Location" />
        </div>
      </div>
      
    </>
    
  );
  
}

export default App;