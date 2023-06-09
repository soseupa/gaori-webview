import React, { useEffect } from "react";
import { getScheduleQuery } from "@/hooks/queries/schedule";

declare global {
  interface Window {
    kakao: any;
  }
}

const { kakao } = window;

export const Map = () => {
  const data = getScheduleQuery();

  useEffect(() => {
    if (data !== undefined) {
      const container = document.getElementById("map");
      const options = {
        center: new kakao.maps.LatLng(
          data.scheduleDetails[Math.floor(data.scheduleDetails.length / 2)].latitude,
          data.scheduleDetails[Math.floor(data.scheduleDetails.length / 2)].longitude
        ),
        level: 6,
      };

      const map = new kakao.maps.Map(container, options);

      let positions = [];
      let linePath = [];

      for (let i = 0; i < data.scheduleDetails.length; i++) {
        positions[i] = {
          title: data.scheduleDetails[i].title,
          latlng: new kakao.maps.LatLng(
            data.scheduleDetails[i].latitude,
            data.scheduleDetails[i].longitude
          ),
        };

        linePath[i] = new kakao.maps.LatLng(
          data.scheduleDetails[i].latitude,
          data.scheduleDetails[i].longitude
        );
      }

      const imageSrc = "https://i.postimg.cc/15RDgg8y/pointer.png";
      const imageSize = new kakao.maps.Size(27, 43);
      const markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize);
      const bounds = new kakao.maps.LatLngBounds();

      for (let i = 0; i < positions.length; i++) {
        let marker = new kakao.maps.Marker({
          map: map,
          position: positions[i].latlng,
          title: positions[i].title,
          image: markerImage,
        });

        let content = `<div class="step">${i + 1}번째</div>`;

        let position = new kakao.maps.LatLng(
          data.scheduleDetails[i].latitude,
          data.scheduleDetails[i].longitude
        );

        let customOverlay = new kakao.maps.CustomOverlay({
          position: position,
          content: content,
        });

        let polyline = new kakao.maps.Polyline({
          path: linePath,
          strokeWeight: 2,
          strokeColor: "#FF7CBB",
          strokeOpacity: 1,
          strokeStyle: "solid",
        });

        bounds.extend(linePath[i]);
        customOverlay.setMap(map);
        polyline.setMap(map);
      }

      const firstPoint = new kakao.maps.Circle({
        center: new kakao.maps.LatLng(
          data.scheduleDetails[0].latitude,
          data.scheduleDetails[0].longitude
        ),
        radius: 5,
        strokeColor: "#FF7CBB",
        fillColor: "#FF7CBB",
        fillOpacity: 1,
      });

      const lastPoint = new kakao.maps.Circle({
        center: new kakao.maps.LatLng(
          data.scheduleDetails[data.scheduleDetails.length - 1].latitude,
          data.scheduleDetails[data.scheduleDetails.length - 1].longitude
        ),
        radius: 5,
        strokeColor: "#FF7CBB",
        fillColor: "#FF7CBB",
        fillOpacity: 1,
      });

      firstPoint.setMap(map);
      lastPoint.setMap(map);

      map.setBounds(bounds);
    }
  }, [data]);

  return <div id="map" style={{ width: "100%", height: "100%" }} />;
};
