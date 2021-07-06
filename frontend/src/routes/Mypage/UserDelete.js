import Axios from "axios";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { SERVER_API } from "../../_actions/config";

import "./Mypage.scss";
import "./UserDelete.scss";

function UserDelete() {
  const history = useHistory();

  const [pw, setPw] = useState(""); //탈퇴할 때 필요한 비번

  const changePW = (e) => {
    setPw(e.target.value);
  };

  const onKeyPress = (e) => {
    if (e.key === "Enter") clickDelete(e);
  };

  const clickDelete = (e) => {
    let confirm = window.confirm("정말로 탈퇴하시겠습니까?");
    if (confirm) {
      e.preventDefault();
      let body = {
        password: pw,
      };
      Axios.delete(`${SERVER_API}/api/users`, {
        data: body,
        //delete로 데이터를 전송하기 위해 필요함
        withCredentials: false,
      })
        .then((res) => {
          console.log(res);
          if (res.data.done) {
            alert("탈퇴가 완료되었습니다");
            history.push("/");
          }
        })
        .catch((err) => {
          console.log(body);
          alert("탈퇴에 실패하였습니다");
        });
    }
  };

  return (
    <div className='mypage-content'>
      <div className='danger-message'>
        [탈퇴하면 작성한 모든 댓글과 게시글이 삭제됩니다.]
      </div>
      <div className='text-field'>
        <div className='field-name'>비밀번호</div>
        <input
          type='password'
          name='oldpassword'
          onChange={changePW}
          onKeyPress={onKeyPress}
        />
      </div>
      <div className='btn-container'>
        <div className='btn-wrapper'>
          <button type='submit' onClick={clickDelete}>
            탈퇴하기
          </button>
          <div className='btn-bottom' />
        </div>
      </div>
    </div>
  );
}

export default UserDelete;
