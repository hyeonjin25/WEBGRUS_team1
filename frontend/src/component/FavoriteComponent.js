import React, { useState, useEffect } from "react";
import { postFavorite, isFavorite } from "../_actions/favoriteAction";

import FavoriteBorder from "@material-ui/icons/FavoriteBorder";
import Favorite from "@material-ui/icons/Favorite";

import { useDispatch } from "react-redux";

function FavoriteComponent({ postid, postlikecnt }) {
  const [FavoriteToggle, setFavoriteToggle] = useState(false);
  const [FavoriteNum, setFavoriteNum] = useState(postlikecnt);

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
  const favoriteToggle = () => {
    if (FavoriteToggle) {
      return <Favorite />;
    } else {
      return <FavoriteBorder />;
    }
  };

  //좋아요 토글
  const favoriteClick = () => {
    //지금 상태와 반대의 상태를 서버에 보내기
    const bool = !FavoriteToggle;
    dispatch(postFavorite(postid, bool))
      .then((res) => {
        console.log(res);
        if (res.payload.status === 'add') {
          setFavoriteNum(FavoriteNum + 1);
        } else {
          setFavoriteNum(FavoriteNum - 1);
        }
        setFavoriteToggle(bool);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div onClick={favoriteClick}>
      {favoriteToggle()} {FavoriteNum}
    </div>
  );
}

export default FavoriteComponent;
