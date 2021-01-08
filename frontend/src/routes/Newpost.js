import React, { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import Dropzone from "react-dropzone";
import AddIcon from "@material-ui/icons/Add";
import TextField from "@material-ui/core/TextField";
import { withRouter } from "react-router-dom";
import { SERVER_API } from "../_actions/config";
import axios from "axios";
// import Chip from "@material-ui/core/Chip";
// import Autocomplete from "@material-ui/lab/Autocomplete";

import { useDispatch, useSelector } from "react-redux";
import { fileUpload } from "../_actions/postAction";

function Newpost(props) {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const [Files, setFiles] = useState([]);
  const [Thumbnails, setThumbnails] = useState([]);
  const [Title, setTitle] = useState("");
  const [Description, setDescription] = useState("");

  useEffect(() => {
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
    if (files.length > 6) {
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
    for (let i = 0; i < Files.length; i++) {
      formdata.append("photos", Files[i]);
    }
    // formdata.append("title", Title);
    // formdata.append("description", Description);
    // formdata.append("user", user.userData);
    
    // 여러 데이터폼 보낸다는 표시
    const config = {
      headers: { "Content-Type": "multipart/form-data" },
    };

    dispatch(fileUpload(formdata, config)).then((response) => {
      //업로드 성공시 업로드된 페이지로 이동
      if (response.success) {
        props.history.push("/mypage");
      } else {
        alert("업로드에 실패했습니다.");
      }
    });
  };

  //input style
  const textfield = {
    margin: "5px 0 10px 0",
    width: "40vw",
    minWidth: "400px",
  };

  //인기 태그 보여주기
  // const topTag = [
  //   "일러스트레이트",
  //   "가구디자인",
  //   "팔레트",
  //   "캐릭터",
  //   "동물",
  //   "인물",
  // ];

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <h1>UPLOAD</h1>
      <TextField
        style={textfield}
        required
        id='standard-required'
        label='제목'
        variant='outlined'
        onChange={onTitle}
      />
      <TextField
        style={textfield}
        id='standard-multiline-static'
        label='작품소개'
        multiline
        rows={4}
        variant='outlined'
        onChange={onDescription}
      />
      {/* <Autocomplete
        style={textfield}
        multiple
        id='태그'
        options={top100Films}
        getOptionLabel={(option) => option.title}
        defaultValue={[topTag[6]]}
        filterSelectedOptions
        renderInput={(params) => (
          <TextField
            {...params}
            variant='outlined'
            label='filterSelectedOptions'
          />
        )}
      /> */}
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
      <Button variant='contained' color='primary' onClick={OnFileUpload}>
        올리기
      </Button>
    </div>
  );
}

export default withRouter(Newpost);
