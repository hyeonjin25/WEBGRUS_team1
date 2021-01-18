import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { SERVER_API } from "../_actions/config";
import AddIcon from "@material-ui/icons/Add";

import { postModify } from "../_actions/postAction";
import { getPostDetail } from "../_actions/postAction";

import Dropzone from "react-dropzone";

// import Chip from "@material-ui/core/Chip";
// import Autocomplete from "@material-ui/lab/Autocomplete";

import { useDispatch, connect } from "react-redux";
import { fileUpload } from "../_actions/postAction";

function PostModify(props) {
  const dispatch = useDispatch();
  const history = useHistory();
  const param = useParams();
  const postid = param.postid;
  const post = props.post;

  const [Title, setTitle] = useState("");
  const [Photos, setPhotos] = useState([]);
  const [Description, setDescription] = useState("");
  const [CurrentTag, setCurrentTag] = useState(""); //현재 작성중인 태그
  const [Tags, setTags] = useState([]); //작성한 태그들 배열
  const [Files, setFiles] = useState([]);
  const [Thumbnails, setThumbnails] = useState([]);

  useEffect(() => {
    dispatch(getPostDetail(postid)).then((res) => {
      setTitle(res.payload.title);
      setPhotos(res.payload.files);
      setDescription(res.payload.description);
      setTags(res.payload.tags);
    });

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

  const onCurrentTag = (e) => {
    setCurrentTag(e.target.value);
  };

  //태그 추가하기
  const onTagClick = (e) => {
    e.preventDefault();
    if (CurrentTag) {
      if (Tags.length > 9) {
        alert("태그는 10개까지 입력하실 수 있습니다.");
      } else {
        setTags([...Tags, CurrentTag]);
      }
      setCurrentTag("");
    }
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

    const allFiles = [...Photos, ...Files];

    if (!Title) {
      alert("제목이 필요합니다!");
    } else if (allFiles.length === 0) {
      alert("파일 업로드가 필요합니다!");
    } else {
      const formdata = new FormData();

      formdata.append("title", Title);

      allFiles.forEach((file) => {
        formdata.append("photos", file);
      });

      if (Description) formdata.append("description", Description);
      if (Tags.length > 0) {
        Tags.forEach((tag) => {
          formdata.append("tags", tag);
        });
      }

      dispatch(postModify({ formdata, postid })).then((res) => {
        console.log(res);
        //수정 성공시 해당 포스트 디테일 페이지로 이동
        if (res) {
          history.push(`/postDetail/${postid}`);
        } else {
          alert("게시물 수정에 실패했습니다.");
        }
      });
    }
  };

  return (
    <>
      {!post.postDetail ? (
        <div style={{ height: "100vh" }}></div>
      ) : (
        <div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <h1>MODIFY</h1>
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
            {/* 태그입력창 */}
            <div>
              <input
                type='text'
                value={CurrentTag}
                name='tag'
                onChange={onCurrentTag}
              />
              <button type='button' onClick={onTagClick}>
                추가
              </button>
              {/* 태그를 추가하면 태그 나타내기 */}
              {Tags
                ? Tags.map((tag) => (
                    <div key={tag}>
                      #{tag}{" "}
                      <button
                        type='button'
                        onClick={(e) => {
                          e.preventDefault();
                          const deleteTag = tag;
                          setTags(Tags.filter((tag) => tag !== deleteTag));
                        }}
                      >
                        삭제
                      </button>
                    </div>
                  ))
                : ""}
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-around",
                flexWrap: "wrap",
              }}
            >
              {/* 사진들 보여주기 */}
              {Photos
                ? Photos.map((photo) => (
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                        margin: "5px 5px 5px 5px",
                      }}
                      key={photo._id}
                    >
                      <img
                        src={`${SERVER_API}/images/${photo.filename}`}
                        style={{ width: 290, height: 290 }}
                      />

                      {/* 파일 삭제버튼 */}
                      <button
                        style={{ width: 50 }}
                        type='button'
                        name='deleteButton'
                        onClick={(e) => {
                          e.preventDefault();
                          const deleteId = photo._id;
                          setPhotos(
                            Photos.filter((photos) => photos._id !== deleteId)
                          );
                        }}
                      >
                        삭제
                      </button>
                    </div>
                  ))
                : ""}
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
      )}
    </>
  );
}
const mapStateToProps = (state) => ({
  post: state.post,
});

export default connect(mapStateToProps)(PostModify);
