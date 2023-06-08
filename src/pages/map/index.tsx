import React from "react";

declare global {
  interface Window {
    kakao: any;
  }
}

const { kakao } = window;

export const Map = () => {
  return <div>Map</div>;
};
