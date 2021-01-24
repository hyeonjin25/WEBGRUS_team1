import React, { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { isFollow, followToggle } from "../_actions/followAction";

function FollowComponent({ userid }) {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);

  const [IsFollow, setIsFollow] = useState(false);

  useEffect(() => {
    dispatch(isFollow(userid))
      .then((res) => {
        setIsFollow(res.payload.favorite);
      })
      .catch((err) => console.log(err));
  }, []);

  const onFollow = () => {
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
    <div>
      <button type='button' name='팔로우' onClick={onFollow}>
        {IsFollow ? "팔로우취소" : "팔로우"}
      </button>
    </div>
  );
}

export default FollowComponent;
