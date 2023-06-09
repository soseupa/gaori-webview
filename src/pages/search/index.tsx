import { addSchedule } from "@/apis/schedule/schedule.api";
import React, { useEffect, useState } from "react";
import { useMutation } from "react-query";
import { useLocation, useSearchParams } from "react-router-dom";

declare global {
  interface Window {
    kakao: any;
  }
}

const { kakao } = window;

type SEARCH_DATA = {
  address_name: string;
  category_group_code: string;
  category_group_name: string;
  category_name: string;
  distance: string;
  id: string;
  phone: string;
  place_name: string;
  place_url: string;
  road_address_name: string;
  x: string;
  y: string;
};

export const Search = () => {
  const [params] = useSearchParams(useLocation().search);
  const [searchText, setSearchText] = useState("");
  const [searchData, setSearchData] = useState<SEARCH_DATA[]>();
  const [map, setMap] = useState<any>();

  const query = useMutation(addSchedule, {
    onSuccess: () => {},
  });

  useEffect(() => {
    const container = document.getElementById("bg-map");
    const options = {
      center: new kakao.maps.LatLng(35.189415586298914, 128.90328372854896),
      level: 6,
    };

    setMap(new kakao.maps.Map(container, options));
  }, []);

  const handleInput = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      search();
    }
  };

  const search = () => {
    const ps = new kakao.maps.services.Places();
    const imageSrc = "https://i.postimg.cc/15RDgg8y/pointer.png";
    const imageSize = new kakao.maps.Size(27, 43);
    const markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize);

    ps.keywordSearch(searchText, (data: any, status: any) => {
      if (status === kakao.maps.services.Status.OK) {
        setSearchData(data);
        const bounds = new kakao.maps.LatLngBounds();

        for (let i = 0; i < data.length; i++) {
          let marker = new kakao.maps.Marker({
            map: map,
            position: new kakao.maps.LatLng(data[i].y, data[i].x),
            image: markerImage,
          });

          bounds.extend(new kakao.maps.LatLng(data[i].y, data[i].x));
        }

        if (map !== undefined) map.setBounds(bounds);
      }
    });
  };

  const focusLocation = (lat: number, lon: number) => {
    const level = map.getLevel();
    const moveLatLon = new kakao.maps.LatLng(lat, lon);

    map.setLevel(level - 8);
    map.panTo(moveLatLon);
  };

  return (
    <>
      <div
        style={{
          position: "absolute",
          display: "flex",
          flexDirection: "column",
          zIndex: "2",
          backgroundColor: "white",
          width: "calc(100% - 40px)",
          bottom: "0",
          height: "40%",
          borderRadius: "40px 40px 0 0",
          alignItems: "center",
          rowGap: "25px",
          padding: "10px 20px",
        }}>
        <div style={{ width: "60px", height: "4px", backgroundColor: "#D9D9D9" }}></div>
        <div
          style={{
            display: "flex",
            position: "relative",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
          }}>
          <img
            onClick={search}
            style={{ position: "absolute", width: "20px", right: "25px" }}
            src="https://i.postimg.cc/0ynTZrs5/search.png"
          />
          <input
            onChange={(e) => setSearchText(e.target.value)}
            onKeyPress={handleInput}
            placeholder="가고 싶은 장소를 검색해 보세요!"
            style={{
              width: "calc(100% - 40px)",
              background: "rgba(249, 230, 239, 0.3)",
              border: "2px solid #FFE2F0",
              borderRadius: "10px",
              padding: "15px 55px 15px 10px",
            }}
          />
        </div>
        <div
          className="box"
          style={{
            display: "flex",
            width: "100%",
            height: "60%",
            flexDirection: "column",
            overflowY: "scroll",
          }}>
          {searchData?.map((s) => (
            <div
              key={s.id}
              style={{
                display: "flex",
                width: "100%",
                height: "100%",
                padding: "18px 0px",
                justifyContent: "space-between",
              }}>
              <div
                style={{
                  display: "flex",
                  width: "70%",
                  height: "100%",
                  flexDirection: "column",
                  gap: "7px",
                }}>
                <span>{s.place_name}</span>
                <span style={{ fontSize: "14px", color: "#767676" }}>{s.address_name}</span>
                <span style={{ fontSize: "14px", color: "#767676" }}>{s.phone}</span>
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  width: "20%",
                  height: "100%",
                  alignSelf: "flex-end",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "3px",
                }}>
                <img
                  onClick={() => focusLocation(Number(s.y), Number(s.x))}
                  style={{ width: "35px", height: "35px" }}
                  src="https://i.postimg.cc/T2nwc8t7/locate.png"
                />
                <span
                  onClick={() =>
                    query.mutate({
                      data: {
                        id: Number(params.get("id")),
                        latitude: Number(s.y),
                        longitude: Number(s.x),
                        title: params.get("title") as string,
                        location: s.place_name,
                      },
                      token: params.get("token") as string,
                    })
                  }
                  style={{ color: "#FF3F9B", fontSize: "12px" }}>
                  지정하기
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div id="bg-map" style={{ width: "100%", height: "65%" }} />
    </>
  );
};
