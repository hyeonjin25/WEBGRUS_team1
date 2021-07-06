import React, { useState, useEffect, useCallback } from "react";
import { postFavorite, isFavorite } from "../_actions/favoriteAction";

import FavoriteBorder from "@material-ui/icons/FavoriteBorder";
import Favorite from "@material-ui/icons/Favorite";

import { useDispatch, useSelector } from "react-redux";

function FavoriteComponent({ postid, postlikecnt }) {
  const [favoriteToggle, setFavoriteToggle] = useState(false);
  const [favoriteNum, setFavoriteNum] = useState(postlikecnt);
  const auth = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(isFavorite(postid))
      .then((res) => {
        setFavoriteToggle(res.payload.favorite);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  //하트 아이콘 상태표시
  const favoriteToggleChange = () => {
    if (favoriteToggle) {
      return <Favorite fontSize='small' color='secondary' />;
    } else {
      return <FavoriteBorder fontSize='small' color='action' />;
    }
  };

  //좋아요 토글
  const favoriteClick = () => {
    if (auth.isAuth) {
      dispatch(postFavorite(postid))
        .then((res) => {
          if (res.payload.status === "add") {
            setFavoriteNum(favoriteNum + 1);
            setFavoriteToggle(true);
          } else if (res.payload.status === "del") {
            setFavoriteNum(favoriteNum - 1);
            setFavoriteToggle(false);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      alert("로그인 후 이용하실 수 있습니다.");
    }
  };

  return (
    <div onClick={favoriteClick}>
      {favoriteToggleChange()} {favoriteNum}
    </div>
  );
}

export default FavoriteComponent;
