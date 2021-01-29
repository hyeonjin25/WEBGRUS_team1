import React, { useEffect, useState } from "react";
import { connect } from "react-redux";

import { getUserposts } from "../../_actions/postAction";
import { getFavoriteposts } from "../../_actions/postAction";

import Loading from "../../component/Loading";
import UserModify from "./UserModify";
import UserDelete from "./UserDelete";
import ViewPosts from "./ViewPosts";

function Mypage(props) {
  const auth = props.auth;

  const [Menu, setMenu] = useState("myposts");
  const [MyPosts, setMyPosts] = useState([]);
  const [FavoritePosts, setFavoritePosts] = useState([]);

  useEffect(() => {
    //auth action에서 userData를 가져올 때 까지 기다리기
    if (auth.status.auth === "SUCCESS" && auth.isAuth) {
      let userid = auth.userData.userid;

      //해당 유저가 올린 게시물 가져오기
      props.getUserposts(userid).then((res) => {
        setMyPosts(res.payload);
      });

      //해당 유저가 좋아한 게시물 가져오기
      props.getFavoriteposts(userid).then((res) => {
        setFavoritePosts(res.payload);
        console.log("좋아하는 게시물 부름");
      });
    }
  }, [auth.status.auth]);

  //해당 유저가 올린 게시물 보여주기
  const onMyPost = () => {
    setMenu("myposts");
  };

  //해당 유저가 좋아한 게시물 보여주기
  const onFavoritePost = () => {
    setMenu("favoriteposts");
  };

  //개인 정보 수정하기
  const onModifyInform = () => {
    setMenu("modifyinform");
  };

  //회원 탈퇴하기
  const onDeleteUser = () => {
    setMenu("deleteuser");
  };

  //선택한 메뉴에 따라 창 로드
  const LoadByMenu = () => {
    if (Menu === "myposts") {
      return (
        <ViewPosts
          posts={MyPosts}
          userid={auth.userData.userid}
          menu={"myposts"}
        />
      );
    } else if (Menu === "favoriteposts") {
      return (
        <ViewPosts
          posts={FavoritePosts}
          userid={auth.userData.userid}
          menu={"favoriteposts"}
        />
      );
    } else if (Menu === "modifyinform") {
      return <UserModify />;
    } else if (Menu === "deleteuser") {
      return <UserDelete />;
    }
  };

  // 나의 계정이 확인 된 후 로드
  if (auth.status.auth === "SUCCESS") {
    return (
      <div style={{ marginLeft: "100px" }}>
        <div
          style={{
            position: "absolute",
            left: 10,
            top: 150,
            display: "flex",
            flexDirection: "column",
          }}
        >
          <button type='button' onClick={onMyPost}>
            내 게시물
          </button>
          <button type='button' onClick={onFavoritePost}>
            내가 좋아하는 게시물
          </button>
          <button type='button' onClick={onModifyInform}>
            개인정보 수정
          </button>
          <button type='button' onClick={onDeleteUser}>
            회원 탈퇴
          </button>
        </div>

        {/* 메뉴 */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          {LoadByMenu()}
        </div>
      </div>
    );
  } else {
    // 로딩중
    return <Loading />;
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { getUserposts, getFavoriteposts })(
  Mypage
);
