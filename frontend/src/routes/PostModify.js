import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { SERVER_API } from "../_actions/config";
import AddIcon from "@material-ui/icons/Add";
import { postModify } from "../_actions/postAction";

import Dropzone from "react-dropzone";

// import Chip from "@material-ui/core/Chip";
// import Autocomplete from "@material-ui/lab/Autocomplete";

import { useDispatch, useSelector } from "react-redux";
import { fileUpload } from "../_actions/postAction";

function PostModify() {
  const post = useSelector((state) => state.post.postDetail.posts);
  const dispatch = useDispatch();
  const history = useHistory();
  const param = useParams();
  const postid = param.postid

  const [Title, setTitle] = useState("");
  const [Photos, setPhotos] = useState([]);
  const [Description, setDescription] = useState("");
  const [Tag, setTag] = useState([]);
  const [Files, setFiles] = useState([]);
  const [Thumbnails, setThumbnails] = useState([]);

  useEffect(() => {
    setTitle(post.title);
    setPhotos(post.photos);
    setDescription(post.description);
    setTag(post.tag);
    //썸네일 주소 삭제
    return () => {
      window.URL.revokeObjectURL(Thumbnails);
    };
  }, []);

  const onTitle = (e) => {
    setTitle(e.target.value);
  };

  const onDescription = (e) => {
    setDescription(e.target.value);
  };

  //파일저장 및 썸네일 생성
  const onDrop = (files) => {
    //원래 올렸었던 파일 포함 최대 업로드개수 제한
    if (files.length + Photos.length > 6) {
      alert("파일은 최대 6개까지 업로드 할 수 있습니다.");
    } else {
      setFiles(files);
      setThumbnails(files.map((file) => URL.createObjectURL(file)));
    }
  };

  //썸네일 보여주기
  const ThumbnailView = Thumbnails.map((thumb) => (
    <div
      key={thumb}
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "150px",
        height: "150px",
        border: "dashed 1px gray",
        margin: "0 10px 0 10px",
      }}
    >
      <img
        src={thumb}
        name='thumbnail'
        style={{ maxWidth: "100%", height: "auto" }}
      />
    </div>
  ));

  //파일들 서버로 보내기
  const OnFileUpload = (e) => {
    e.preventDefault();

    const formdata = new FormData();
    const allFiles = [...Photos, ...Files];
    formdata.append("photos", allFiles);
    formdata.append("title", Title);
    formdata.append("description", Description);
    formdata.append("tag", Tag);
    // formdata.append("owner", user.userData.userid);

    // 여러 데이터폼 보낸다는 표시
    const config = {
      headers: { "Content-Type": "multipart/form-data" },
    };

    dispatch(postModify(formdata, config, postid)).then((response) => {
      //수정 성공시 해당 포스트 디테일 페이지로 이동
      if (response) {
        history.push(`/postDetail/${postid}`);
      } else {
        alert("포스트 수정에 실패했습니다.");
      } 
    });
  };

  return (
    <div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <h1>UPLOAD</h1>
        제목
        <input
          style={{ width: 500, height: 20 }}
          type='text'
          name='title'
          value={Title}
          onChange={onTitle}
        />
        <br />
        작품소개
        <input
          style={{ width: 500, height: 200 }}
          type='textarea'
          name='Description'
          value={Description}
          onChange={onDescription}
        />

        <div
          style={{
            display: "flex",
            justifyContent: "space-around",
            flexWrap: "wrap",
          }}
        >
          {/* 사진들 보여주기 */}
          {Photos.map((photo) => (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                margin: "5px 5px 5px 5px",
              }}
            >
              <img
                src={`${SERVER_API}/${photo.path}`}
                style={{ width: 290, height: 290 }}
              />

              {/* 파일 삭제버튼 */}
              <button
                style={{ width: 50 }}
                type='button'
                name='deleteButton'
                onClick={() => {
                  const deleteId = photo.id;
                  setPhotos(Photos.filter((photos) => photos.id !== deleteId));
                }}
              >
                삭제
              </button>
            </div>
          ))}
        </div>

        {/* 이미지 업로드 */}
        <Dropzone accept='image/*' onDrop={onDrop}>
          {({ getRootProps, getInputProps }) => (
            <section
              style={{
                display: "flex",
                justifyContent: "center",
                marginTop: "5vh",
              }}
            >
              <div
                {...getRootProps()}
                style={{
                  width: "40vw",
                  height: "30vh",
                  minWidth: "400px",
                  minHeight: "100px",
                  backgroundColor: "lightgray",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  border: "dashed 3px gray",
                }}
              >
                <input {...getInputProps()} />
                <AddIcon />
                <p style={{ margin: "3vh 0 3vh 0" }}>
                  이미지 파일을 선택하거나 끌어다 놓으세요
                </p>
                <p style={{ fontSize: "12px", margin: 0 }}>
                  (파일은 최대 6개까지 업로드 할 수 있습니다.)
                </p>
              </div>
            </section>
          )}
        </Dropzone>

        <div
          style={{
            margin: "5vh 0 5vh 0",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "1000px",
            overflowX: "auto",
            overflowY: "hidden",
          }}
        >
          {ThumbnailView}
        </div>
        <button type='button' onClick={OnFileUpload}>
          올리기
        </button>
      </div>
    </div>
  );
}

export default PostModify;
