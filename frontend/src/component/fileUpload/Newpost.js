import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import Dropzone from "react-dropzone";
import AddIcon from "@material-ui/icons/Add";

function Newpost() {
  const [Files, setFiles] = useState([]);
  const [Thumbnails, setThumbnails] = useState([]);

  const onDrop = (files) => {
    setFiles(files);
    setThumbnails(files.map((file) => URL.createObjectURL(file)));
    console.log(Thumbnails);
  };

  const ThumbnailView = Thumbnails.map((thumb) => (
    <div key={thumb}>
      <div style={{ width: "150px", height: "150px" }}>
        <img
          src={thumb}
          name='thumbnail'
          style={{ width: "100px", height: "100px" }}
        />
      </div>
    </div>
  ));

  const onFileUpload = (e) => {
    let reader = FileReader();

    reader.onloadend = () => {
      const thumb = reader.result;
      if (thumb) {
        setThumbnails(thumb);
      }
    };

    setFiles(e.target.file);

    console.log(Files);
    console.log(Thumbnails);
  };

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <Dropzone accept='image/*' onDrop={onDrop}>
        {({ getRootProps, getInputProps }) => (
          <section style={{ display: "flex", justifyContent: "center" }}>
            <div
              {...getRootProps()}
              style={{
                width: "40vw",
                height: "30vh",
                minWidth: "200px",
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
              <p>파일을 선택하거나 끌어다 놓으세요</p>
            </div>
          </section>
        )}
      </Dropzone>
      <div
        style={{
          marginTop:'5vh',
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
          minWidth:'1000px'
        }}
      >
        {ThumbnailView}
      </div>
      <Button variant='contained' color='primary' onClick={null}>
        올리기
      </Button>
    </div>
  );
}

export default Newpost;
