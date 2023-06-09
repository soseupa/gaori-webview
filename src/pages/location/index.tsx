import React, { useEffect, useState } from "react";
import { getScheduleQuery } from "@/hooks/queries/schedule";
import { useLocation, useSearchParams } from "react-router-dom";

declare global {
  interface Window {
    kakao: any;
  }
}

const { kakao } = window;

export const Location = () => {
  const [params] = useSearchParams(useLocation().search);

  useEffect(() => {
    const container = document.getElementById("locate-map");
    const options = {
      center: new kakao.maps.LatLng(Number(params.get("lat")), Number(params.get("lon"))),
      level: 2,
    };

    const map = new kakao.maps.Map(container, options);

    const imageSrc = "https://i.postimg.cc/15RDgg8y/pointer.png";
    const imageSize = new kakao.maps.Size(27, 43);
    const markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize);

    const markerPosition = new kakao.maps.LatLng(
      Number(params.get("lat")),
      Number(params.get("lon"))
    );

    const marker = new kakao.maps.Marker({
      title: params.get("title"),
      position: markerPosition,
      image: markerImage,
    });

    marker.setMap(map);
  }, []);

  return (
    <>
      <div id="locate-map" style={{ width: "100%", height: "65%" }} />
    </>
  );
};
