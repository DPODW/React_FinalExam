import React, { useEffect, useState } from 'react';

function CurrentNews() {
  const [news, setNews] = useState([]); // 뉴스 데이터를 저장할 상태

  useEffect(() => {
    // API 요청을 처리하는 함수
    const fetchNews = async () => {
      try {
        // API 요청을 보내는 코드
        const response = await fetch('https://newsapi.org/v2/top-headlines?country=kr&apiKey=765be21663be402690f092b13c09f49f');
        const data = await response.json();

        // API 응답 데이터를 상태로 업데이트
        setNews(data.articles);
      } catch (error) {
        console.error('Error fetching news:', error);
      }
    };

    fetchNews(); // API 요청 수행
  }, []); // 빈 배열을 전달하여 컴포넌트가 마운트될 때만 요청 수행

  return (
    <div>
      <h1>뉴스</h1>
      <ul>
        {news.map((article, index) => (
          <li key={index}>
            <h2>{article.title}</h2>
            <p>{article.description}</p>
            <a href={article.url} target="_blank" rel="noopener noreferrer">
              Read More
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CurrentNews;