import React from 'react'
import { Map, MapMarker } from 'react-kakao-maps-sdk';

interface KakaoMapProps {
    latitude: number;
    longitude: number;
    setCustomValue?: (id: string, value: number) => void;
    detailPage?: boolean;
}
const KakaoMap = ({
  latitude,
  longitude,
  setCustomValue,
  detailPage = false, // 상품 상세페이지 분기처리
}: KakaoMapProps) => {

  const handleClick = (mouseEvent: kakao.maps.event.MouseEvent) => {
    // console.log(mouseEvent);
    // if(setCustomValue) {
    //   setCustomValue('latitude', mouseEvent.latLng.getLat());
    //   setCustomValue("longitude", mouseEvent.latLng.getLng());
    // }
    if (detailPage) return; // 간결, 효율적
    setCustomValue!('latitude', mouseEvent.latLng.getLat());
    setCustomValue!("longitude", mouseEvent.latLng.getLng()); 
  };

  return (
    <Map
      center={{ lat: latitude, lng: longitude }}
      style={{ width: "100%", height: "360px" }}
      onClick={(_, mouseEvent) => handleClick(mouseEvent)}
    >
      <MapMarker position={{ lat: latitude, lng: longitude }}>
        {/* <div style={{ color: "#000" }}>Hello World!</div> */}
      </MapMarker>
    </Map>
  );
};

export default KakaoMap