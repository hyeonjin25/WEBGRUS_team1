import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { isFollow, followToggle } from "../_actions/followAction";

function FollowComponent(params) {
  const [IsFollow, setIsFollow] = useState(false);
  const dispatch = useDispatch();
  const userid = params.userid;

  useEffect(() => {
    dispatch(isFollow())
      .then((res) => setIsFollow(res))
      .catch((err) => console.log(err));
  }, []);

  const onFollow = () => {
    const bool = !IsFollow;
    dispatch(followToggle(userid, bool))
      .then((res) => setIsFollow(bool))
      .catch((err) => console.log(err));
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
