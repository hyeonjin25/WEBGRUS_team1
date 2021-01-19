import React from "react";
import { SERVER_API } from "../_actions/config";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../component/_slick-theme.css";

//PostDetail 페이지의 해당 포스트 보여주기
function ViewPostDetail({ post, files, posttime, tags }) {

  const slickSettings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
  };

  return (
      <div
        style={{
          borderStyle: "solid",
          width: 900,
          margin: "5px 5px 5px 10px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", flexDirection:'column' }}>
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
                <div key={file._id}>
                  <img
                    src={`${SERVER_API}/images/${file.filename}`}
                    style={{
                      width: 500,
                      height: 500,
                    }}
                  />
                </div>
              ))
            : ""}
          {/* </Slider> */}
        </div>

        <div
          style={{
            width: "90%",
            textOverflow: "ellipsis",
            overflow: "hidden",
            whiteSpace: "nowrap",
          }}
        >
          <p>{post.title}</p>
          <div>{post.description}</div>
          <div>
            <div>
              {tags ? tags.map((tag) => <div key={tag}>#{tag}</div>) : ""}
            </div>
          </div>
          <div>Date: {posttime}</div>
          <div>
            Like: {post.likecnt} View: {post.viewcnt}
          </div>
        </div>
      </div>
  );
}

export default ViewPostDetail;
