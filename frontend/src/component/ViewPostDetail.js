import React from "react";
import { SERVER_API } from "../_actions/config";
import Slider from "react-slick";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../component/_slick-theme.css";

import "./ViewPostDetail.scss";
import "../index.css";
import "../reset.css";

//PostDetail 페이지의 해당 포스트 보여주기
function ViewPostDetail({
  postid,
  title,
  description,
  files,
  tags,
  posttime,
  likecnt,
  viewcnt,
  commentcnt,
}) {

  const slickSettings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
  };

  return (
    <div className="post-container">
      <div className="post">
        <div className="photo-container">

          {/* 사진들 보여주기 - 사진 여러개면 slick사용 */}
          {/* <Slider
              {...slickSettings}
              style={{
                borderStyle: "solid",
                width: 500,
              }}
            > */}

          {files
            ? files.map((file) => (
              <div key={file._id} className="photos">
                <img
                  src={`${SERVER_API}/images/${file.filename}`}
                  alt={title}
                  download={files.originalname}
                />
              </div>
            ))
            : ""}

          {/* </Slider> */}
        </div>

        <div className="info-container">
          <div className="left-text">
            <div className="title-text">{title}</div>
            <div className="description-text">{description}</div>
          </div>
          <div className="right-text">
            <div className="tag-text">
              {tags
                ? tags.map((tag) => (
                  <div key={tag} style={{ display: "inline" }}>
                    #{tag}{" "}
                  </div>
                ))
                : ""}
            </div>
            <div className="date-text">{posttime}</div>
            <div className="info-text">Like: {likecnt} View: {viewcnt} comment: {commentcnt}</div>
          </div>
        </div>
      </div>
      <div className="bottom-box"></div>
    </div>
  );
}

export default ViewPostDetail;
