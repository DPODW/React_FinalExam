/*global kakao*/ 
import React, { useEffect } from 'react'

const KakaoMap=()=>{

  useEffect(()=>{
    
    var container = document.getElementById('map');
    var options = {
      center: new kakao.maps.LatLng(35.4950025396196,129.41564600766145),
      level: 3
    };
    var map = new kakao.maps.Map(container, options);
    }, [])


    return (
        <div>
        	<div id="map" style={{width:"500px", height:"400px"}}></div> 
        </div>
    )
}

export default KakaoMap;