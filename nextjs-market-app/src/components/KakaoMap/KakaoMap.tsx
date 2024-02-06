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
  return (
    <Map
      center={{ lat: 33.5563, lng: 126.79581 }}
      style={{ width: "100%", height: "360px" }}
    >
      <MapMarker position={{ lat: 33.55635, lng: 126.795841 }}>
        <div style={{ color: "#000" }}>Hello World!</div>
      </MapMarker>
    </Map>
  );
};

export default KakaoMap