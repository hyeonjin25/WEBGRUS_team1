import React, { useEffect, useState, Component } from "react";
import { useParams } from "react-router-dom";
import { SERVER_API } from "../_actions/config";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../component/_slick-theme.css";

import { useDispatch } from "react-redux";
import { getPostDetail } from "../_actions/postAction";

//PostDetail 페이지의 해당 포스트 보여주기
function ViewPostDetail() {
  //주소로 넘어온 파라미터 받기
  const param = useParams();
  const dispatch = useDispatch();

  const [Post, setPost] = useState([]);
  const [Photos, setPhotos] = useState([]);

  useEffect(() => {
    dispatch(getPostDetail(param)).then((res) => {
      setPost(res.payload.posts);
      setPhotos(res.payload.posts.photos);
    });
  }, []);

  const slickSettings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
  };

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <div
        style={{
          borderStyle: "solid",
          width: 900,
          margin: "5px 5px 5px 10px",
        }}
      >
        <div style={{ display: "flex", justifyContent: "center" }}>
          {/* 사진들 보여주기 */}
          <Slider
            {...slickSettings}
            style={{
              borderStyle: "solid",
              width: 500,
            }}
          >
            {Photos.map((photo) => (
              <div>
                <img
                  src={`${SERVER_API}/${photo.path}`}
                  // src='https://postfiles.pstatic.net/MjAyMDEyMDRfNDgg/MDAxNjA3MDkzOTY5NzQx.aiWaOE9spN6qRdX5Yxc3TVnGmkbTYosj9X0j9o3Fh8Ig.Z5qNMeLnm5CgOvLO1iNfqm9x3H4FrQbu527d82qXxbUg.JPEG.wlduddl9604/IMG_5736.jpg?type=w580'
                  style={{
                    width: 500,
                    height: 500,
                  }}
                />
              </div>
            ))}
          </Slider>
        </div>

        <div
          style={{
            width: "90%",
            textOverflow: "ellipsis",
            overflow: "hidden",
            whiteSpace: "nowrap",
          }}
        >
          <p>{Post.title}</p>
          <div>{Post.description}</div>
          <div>Date: {Post.posttime}</div>
          <div>
            Like: {Post.likecnt} View: {Post.viewcnt}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ViewPostDetail;
