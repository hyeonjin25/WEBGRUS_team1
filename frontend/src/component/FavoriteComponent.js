import React, { useState, useEffect, useCallback } from "react";
import { postFavorite, isFavorite } from "../_actions/favoriteAction";

import FavoriteBorder from "@material-ui/icons/FavoriteBorder";
import Favorite from "@material-ui/icons/Favorite";

import { useDispatch, useSelector } from "react-redux";

function FavoriteComponent({ postid, postlikecnt }) {
  const [FavoriteToggle, setFavoriteToggle] = useState(false);
  const [FavoriteNum, setFavoriteNum] = useState(postlikecnt);
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
  const favoriteToggle = () => {
    if (FavoriteToggle) {
      return <Favorite />;
    } else {
      return <FavoriteBorder />;
    }
  };

  //좋아요 토글
  const favoriteClick = () => {
    if (auth.isAuth) {
      dispatch(postFavorite(postid))
        .then((res) => {
          if (res.payload.status === "add") {
            setFavoriteNum(FavoriteNum + 1);
            setFavoriteToggle(true);

          } else if(res.payload.status === "del"){
            setFavoriteNum(FavoriteNum - 1);
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
      {favoriteToggle()} {FavoriteNum}
    </div>
  );
}

export default FavoriteComponent;
