import React, { useEffect } from "react";

declare global {
  interface Window {
    kakao: any;
  }
}

const { kakao } = window;

export const Map = () => {
  useEffect(() => {
    const container = document.getElementById("map");
    const options = {
      center: new kakao.maps.LatLng(33.450701, 126.570667),
      level: 3,
    };

    const map = new kakao.maps.Map(container, options);
  }, []);

  return <div id="map" style={{ width: "100%", height: "100%" }} />;
};
