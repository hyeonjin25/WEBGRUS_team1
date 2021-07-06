import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { SERVER_API } from "../_actions/config";

import Dropzone from "react-dropzone";

import AddIcon from "@material-ui/icons/Add";
import CloseIcon from "@material-ui/icons/CloseOutlined";

import styled from "styled-components";

import { useDispatch, connect } from "react-redux";
import { postModify } from "../_actions/postAction";
import { getPostDetail } from "../_actions/postAction";
import { fileUpload } from "../_actions/postAction";

const StyleDiv = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: left;
  align-items: flex-start;
  min-width: 380px;
  width: 55vw;
`;

const StyleLabel = styled.div`
  display: inline-block;
  margin: 5px 0 10px 0;
  width: 5vw;
  min-width: 70px;
  text-align: center;
  font-family: "notoBold";
`;

const StyleInput = styled.input`
  margin: 5px 2vw 10px 2vw;
  width: 40vw;
  min-width: 360px;
  min-height: 27px;
  border: 2px solid black;
`;

const StyleButton = styled.button`
  width: 50px;
  height: 25px;
  background-color: black;
  color: white;
`;

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
  const onDrop = (newfiles) => {
    //원래 올렸었던 파일 포함 최대 업로드개수 제한
    if (newfiles.length + files.length > 6) {
      alert("파일은 최대 6개까지 업로드 할 수 있습니다.");
    } else {
      setNewFiles(newfiles);
      setThumbnails(newfiles.map((newfile) => URL.createObjectURL(newfile)));
    }
  };

  //드랍존
  const dropZone = (
    <Dropzone accept='image/*' onDrop={onDrop}>
      {({ getRootProps, getInputProps }) => (
        <section
          style={{
            display: "flex",
            justifyContent: "center",
            margin: "2vh 2vw 2vh 2vw",
          }}
        >
          <div
            {...getRootProps()}
            style={{
              width: `calc(40vw + 4px)`,
              height: "30vh",
              minWidth: 360,
              minHeight: 100,
              backgroundColor: "lightgray",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              border: "dashed 3px black",
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
  );

  //원래 파일들 보여주기
  const UploadedFiles = files.map((photo) => (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        key={photo._id}
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "150px",
          height: "150px",
          border: "dashed 1px gray",
        }}
      >
        <img
          src={`${SERVER_API}/images/${photo.filename}`}
          name='thumbnail'
          style={{
            maxWidth: "150px",
            maxHeight: "150px",
            width: "auto",
            height: "auto",
          }}
        />
      </div>
      {/* 파일 삭제버튼 */}
      <CloseIcon
        type='button'
        name='deleteButton'
        fontSize='small'
        color='action'
        onClick={(e) => {
          e.preventDefault();
          const deleteId = photo._id;
          setDeleteFiles([...deleteFiles, photo.filename]);
          setFiles(files.filter((photos) => photos._id !== deleteId));
        }}
        style={{ backgroundColor: "#FFFFFF" }}
      ></CloseIcon>
    </div>
  ));

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
    <div
      style={{ display: "flex", alignItems: "center", flexDirection: "column" }}
    >
      {!post.postDetail ? (
        <div style={{ height: "100vh" }}></div>
      ) : (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <h1 style={{ fontFamily: "notoBold" }}>MODIFY</h1>
          <div
            style={{
              position: "relative",
              display: "flex",
              justifyContent: "center",
              width: "80vw",
              padding: "4vh 0 50px 0",
              backgroundColor: "#FFFFFF",
              border: "solid 3px black",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "left",
                margin: "0 auto",
              }}
            >
              {/* 사진들 보여주기 */}
              <StyleDiv>
                <StyleLabel style={{ height: 0 }} />
                <div
                  style={{
                    margin: "3vh 2vw",
                    minWidth: 360,
                    width: "40vw",
                    display: "flex",
                    justifyContent: "left",
                    alignItems: "center",
                    overflowX: "auto",
                    overflowY: "hidden",
                  }}
                >
                  {UploadedFiles}
                </div>
              </StyleDiv>

              {/* 썸네일 보여주기 */}
              <StyleDiv>
                <StyleLabel style={{ height: 0 }} />
                <div
                  style={{
                    margin: "3vh 2vw",
                    minWidth: 360,
                    width: "40vw",
                    display: "flex",
                    justifyContent: "left",
                    alignItems: "center",
                    overflowX: "auto",
                    overflowY: "hidden",
                  }}
                >
                  {ThumbnailView}
                </div>
              </StyleDiv>

              {/* 드랍존: 이미지 올리기 */}
              <StyleDiv>
                <StyleLabel style={{ height: 0 }} />
                {dropZone}
              </StyleDiv>

              <StyleDiv>
                <StyleLabel>제목</StyleLabel>
                <StyleInput
                  style={{ width: 500, height: 20 }}
                  type='text'
                  name='title'
                  value={title}
                  onChange={onTitle}
                />
              </StyleDiv>

              <StyleDiv>
                <StyleLabel>작품소개</StyleLabel>
                <StyleInput
                  style={{ width: 500, height: 200 }}
                  type='textarea'
                  name='Description'
                  value={description}
                  onChange={onDescription}
                />
              </StyleDiv>

              {/* 태그입력창 */}
              <StyleDiv>
                <StyleLabel>태그</StyleLabel>
                <div style={{ margin: "5px 2vw 10px 2vw" }}>
                  <StyleInput
                    style={{
                      width: `calc(38vw - 50px)`,
                      minWidth: `calc(310px - 2vw)`,
                      margin: "0 2vw 0 0",
                    }}
                    type='text'
                    value={currentTag}
                    name='tag'
                    onChange={onCurrentTag}
                    onKeyPress={onTagKeyPress}
                  />
                  <StyleButton type='button' onClick={onTagClick}>
                    추가
                  </StyleButton>
                </div>
              </StyleDiv>
              <div
                style={{
                  display: "flex",
                  flexdirection: "wrap",
                  marginLeft: 70,
                }}
              >
                {/* 태그를 추가하면 태그 나타내기 */}
                {tags
                  ? tags.map((tag) => (
                      <div
                        key={tag}
                        style={{
                          height: 20,
                          display: "flex",
                          alignItems: "center",
                          marginRight: 3,
                        }}
                      >
                        <div> #{tag}</div>
                        <CloseIcon
                          type='button'
                          fontSize='small'
                          color='action'
                          onClick={(e) => {
                            e.preventDefault();
                            const deleteTag = tag;
                            setTags(tags.filter((tag) => tag !== deleteTag));
                          }}
                          style={{ backgroundColor: "#FFFFFF" }}
                        ></CloseIcon>
                      </div>
                    ))
                  : ""}
              </div>
            </div>

            <div>
              <div
                style={{
                  position: "absolute",
                  right: 30,
                  bottom: 20,
                  width: 70,
                  height: 30,
                  border: "2px solid black",
                  borderRadius: 4,
                  backgroundColor: "#FFFFFF",
                  boxSizing: "border-box",
                }}
              />
              <StyleButton
                type='submit'
                variant='contained'
                color='primary'
                onClick={BlockDoubleSubmit}
                style={{
                  position: "absolute",
                  right: 30,
                  bottom: 25,
                  width: 70,
                  height: 24,
                  display: "block",
                  borderRadius: 4,
                }}
              >
                올리기
              </StyleButton>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
const mapStateToProps = (state) => ({
  post: state.post,
});

export default connect(mapStateToProps)(PostModify);
