import React, { useEffect, useState } from 'react';
import './covid.css';

const CurrentCovid = () => {
  const [covidData, setCovidData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://api.corona-19.kr/korea/?serviceKey=vhrbPfnauVzkWATq27DLecgKQtiMp9d31');
        const data = await response.json();
        setCovidData(data);
      } catch (error) {
        console.log('Error fetching COVID-19 data:', error);
      }
    };

    fetchData();
  }, []);

  if (!covidData) {
    return <div>Loading...</div>;
  }

  const citiesToDisplay = ['ulsan', 'busan', 'seoul'];

  return (
    <div className="covid-container">
  <h2 className="covid-heading">COVID-19 현황</h2>
  <h4>매일 09시 업데이트</h4>
  <ul className="city-list">
    {citiesToDisplay.map((city) => (
      <li key={city} className="city-item">
        <h3 className="city-name">{covidData[city].countryNm}</h3>
        <p className="city-cases">
         누적 확진자: {covidData[city].totalCnt.toLocaleString()}
        </p>
      </li>
    ))}
  </ul>
</div>
  );
};

export default CurrentCovid;