import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import Dropzone from "react-dropzone";
import AddIcon from '@material-ui/icons/Add';
import Drag from './DragandDrap';

function Newpost() {
  const [File, setFile] = useState(null);

  const onFileUpload = (e) => {
    setFile(e.target.file);
  };

  return (
    <div>
        <Drag/>
      <Dropzone onDrop={(acceptedFiles) => console.log(acceptedFiles)}>
        {({ getRootProps, getInputProps }) => (
          <section>
            <div {...getRootProps()} style={{height:'100px'}}>
              <input {...getInputProps()} />
              <AddIcon/>
              <p>파일을 선택하거나 끌어다 놓으세요</p>
            </div>
          </section>
        )}
      </Dropzone>
      <Button varient='Button' color='primary' onClick={null}>
        올리기
      </Button>
    </div>
  );
}

export default Newpost;
