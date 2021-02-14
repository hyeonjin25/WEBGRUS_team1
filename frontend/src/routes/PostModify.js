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

  const [title, setTitle] = useState("");
  const [files, setFiles] = useState([]); //원래 올려져있던 사진파일
  const [newFiles, setNewFiles] = useState([]); //새롭게 올릴 사진파일
  const [deleteFiles, setDeleteFiles] = useState([]); //지울 사진파일
  const [description, setDescription] = useState("");
  const [currentTag, setCurrentTag] = useState(""); //현재 작성중인 태그
  const [tags, setTags] = useState([]); //작성한 태그들 배열
  const [thumbnails, setThumbnails] = useState([]);

  useEffect(() => {
    dispatch(getPostDetail(postid)).then((res) => {
      setTitle(res.payload.title);
      setFiles(res.payload.files);
      setDeleteFiles(res.payload.files); //앞으로 삭제할 포토들
      setDescription(res.payload.description);
      setTags(res.payload.tags);
    }, []);

    //썸네일 주소 삭제
    return () => {
      window.URL.revokeObjectURL(thumbnails);
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

  const onTagKeyPress = (e) => {
    if (e.key === "Enter") onTagClick();
  };

  //태그 추가하기
  const onTagClick = (e) => {
    e.preventDefault();
    if (currentTag) {
      if (tags.length > 9) {
        alert("태그는 10개까지 입력하실 수 있습니다.");
      } else {
        setTags([...tags, currentTag]);
      }
      setCurrentTag("");
    }
  };

  //파일저장 및 썸네일 생성
  const onDrop = (files) => {
    //원래 올렸었던 파일 포함 최대 업로드개수 제한
    if (files.length + files.length > 6) {
      alert("파일은 최대 6개까지 업로드 할 수 있습니다.");
    } else {
      setNewFiles(files);
      setThumbnails(files.map((file) => URL.createObjectURL(file)));
    }
  };

  //썸네일 보여주기
  const ThumbnailView = thumbnails.map((thumb) => (
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
        style={{
          maxWidth: "150px",
          maxHeight: "150px",
          width: "auto",
          height: "auto",
        }}
      />
    </div>
  ));

  //파일들 서버로 보내기
  const onFileUpload = (e) => {
    e.preventDefault();

    const allFiles = [...files, ...newFiles];

    if (!title) {
      alert("제목이 필요합니다!");
    } else if (allFiles.length === 0) {
      alert("파일 업로드가 필요합니다!");
    } else {
      const formdata = new FormData();

      formdata.append("title", title);

      allFiles.forEach((file) => {
        formdata.append("photos", file);
      });

      //지울 파일이름들 추가
      if (deleteFiles)
        deleteFiles.forEach((files) => {
          formdata.append("deletedFiles", files);
        });

      if (description) formdata.append("description", description);
      if (tags.length > 0) {
        tags.forEach((tag) => {
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

  let doubleSubmit = true;

  //중복 제출 방지
  const BlockDoubleSubmit = (e) => {
    //첫 제출
    if (doubleSubmit) {
      onFileUpload(e);
      doubleSubmit = false;
    } else {
      alert("제출 중 입니다");
      return false;
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
              value={title}
              onChange={onTitle}
            />
            <br />
            작품소개
            <input
              style={{ width: 500, height: 200 }}
              type='textarea'
              name='Description'
              value={description}
              onChange={onDescription}
            />
            {/* 태그입력창 */}
            <div>
              <input
                type='text'
                value={currentTag}
                name='tag'
                onChange={onCurrentTag}
                onKeyPress={onTagKeyPress}
              />
              <button type='button' onClick={onTagClick}>
                추가
              </button>
              {/* 태그를 추가하면 태그 나타내기 */}
              {tags
                ? tags.map((tag) => (
                    <div key={tag}>
                      #{tag}{" "}
                      <button
                        type='button'
                        onClick={(e) => {
                          e.preventDefault();
                          const deleteTag = tag;
                          setTags(tags.filter((tag) => tag !== deleteTag));
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
              {files
                ? files.map((photo) => (
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
                          setDeleteFiles([...deleteFiles, photo.filename]);
                          setFiles(
                            files.filter((photos) => photos._id !== deleteId)
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
            <button type='submit' type='button' onClick={BlockDoubleSubmit}>
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
