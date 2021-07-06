import Axios from "axios";
import React, { useState } from "react";
import { SERVER_API } from "../../_actions/config";

import "./Mypage.scss";
import "./UserModify.scss";

function UserModify() {
  const [oldPW, setOldPW] = useState(""); //변경하기 전 비번
  const [newPW, setNewPW] = useState(""); //변경할 비번
  const [newPWcheck, setNewPWcheck] = useState(""); //변경할 비번 체크
  const [email, setEmail] = useState(""); //변경할 이메일

  const changeOldPW = (e) => {
    setOldPW(e.target.value);
  };

  const changeNewPW = (e) => {
    setNewPW(e.target.value);
  };

  const changeNewPWcheck = (e) => {
    setNewPWcheck(e.target.value);
  };

  const changeEmail = (e) => {
    setEmail(e.target.value);
  };

  const clickModify = (e) => {
    if (newPW === newPWcheck) {
      e.preventDefault();
      let body = {
        oldpassword: oldPW,
        useremail: email,
        password: newPW,
      };
      Axios.put(`${SERVER_API}/api/users`, body)
        .then((res) => {
          if (res.data.done) {
            alert("변경이 완료되었습니다");
            setOldPW("");
            setNewPW("");
            setNewPWcheck("");
            setEmail("");
          }
        })
        .catch((err) => {
          alert("변경에 실패하였습니다");
          setOldPW("");
          setNewPW("");
          setNewPWcheck("");
          setEmail("");
        });
    } else {
      alert("비밀번호 확인이 맞지 않습니다");
    }
  };

  return (
    <div className="mypage-content">
      <div className="text-field">
        <div className="field-name">현재 비밀번호</div>
        <input
          type='password'
          name='oldpassword'
          value={oldPW}
          onChange={changeOldPW}
        />
      </div>
      <div className="text-field">
        <div className="field-name">변경할 비밀번호</div>
        <input
          type='password'
          name='newpassword'
          value={newPW}
          onChange={changeNewPW}
        />
      </div>
      <div className="text-field">
        <div className="field-name">변경할 비밀번호 확인</div>
        <input
          type='password'
          name='newpasswordcheck'
          value={newPWcheck}
          onChange={changeNewPWcheck}
        />
      </div>
      <div className="text-field">
        <div className="field-name">변경할 이메일</div>
        <input
          type='text'
          name='useremail'
          value={email}
          onChange={changeEmail}
        />
      </div>
      <div className="btn-container">
        <div className="btn-wrapper">
          <button type='submit' onClick={clickModify}>
            변경하기
          </button>
          <div className='btn-bottom' />
        </div>
      </div>
    </div>
  );
}

export default UserModify;
