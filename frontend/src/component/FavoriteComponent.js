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
        FavoriteToggle(res);
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
    const bool = !FavoriteToggle;
    dispatch(postFavorite(postid, bool))
      .then((res) => {
        setFavoriteNum(FavoriteNum + 1);
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
