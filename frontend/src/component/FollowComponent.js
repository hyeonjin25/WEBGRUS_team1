import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { followCheck, followToggle } from "../_actions/followAction";

import "../routes/PostDetail.scss";

function FollowComponent({ userid }) {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);

  const [isFollow, setIsFollow] = useState(false);

  useEffect(() => {
    // 파라미터 오면 실행
    if (userid) {
      dispatch(followCheck(userid))
        .then((res) => {
          setIsFollow(res.payload.following);
        })
        .catch((err) => console.log(err));
    }
  }, [userid]);

  const onFollow = () => {
    //로그인 상태일 때만 팔로우 가능
    if (auth.token) {
      dispatch(followToggle(userid))
        .then((res) => {
          if (res.payload.status === "add") setIsFollow(true);
          else if (res.payload.status === "del") {
            setIsFollow(false);
          }
        })
        .catch((err) => console.log(err));
    } else {
      alert("로그인 후 이용하실 수 있습니다.");
    }
  };

  return (
    <div className='btn-container'>
      <button className='top-btn' type='button' name='팔로우' onClick={onFollow}>
        {isFollow ? "팔로우 취소" : "팔로우"}
      </button>
      <div className='btn-bottom' />
    </div>
  );
}

export default FollowComponent;
