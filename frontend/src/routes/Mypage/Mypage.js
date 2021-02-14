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

  const [menu, setMenu] = useState("myposts");
  const [myPosts, setMyPosts] = useState([]);
  const [myPostsNum, setMyPostsNum] = useState();
  const [favoritePosts, setFavoritePosts] = useState([]);
  const [favoritePostsNum, setFavoritePostsNum] = useState();
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    //auth action에서 userData를 가져올 때 까지 기다리기
    if (auth.status.auth === "SUCCESS" && auth.isAuth) {
      let userid = auth.userData.userid;
      let page = 1;
      //해당 유저가 올린 게시물 가져오기
      props.getUserposts({ userid, page }).then((res) => {
        setMyPosts(res.payload); //첫 10개만
        setMyPostsNum(res.payload.length); //게시물 개수 저장
      });

      //해당 유저가 좋아한 게시물 가져오기
      props.getFavoriteposts({ userid, page }).then((res) => {
        setFavoritePosts(res.payload);
        setFavoritePostsNum(res.payload.length);
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

  //페이지 클릭 버튼 로드
  const SelectPage = (menu) => {
    let postNum;
    if (menu === "myposts") {
      postNum = myPostsNum;
    } else if (menu === "favoriteposts") {
      postNum = favoritePostsNum;
    }
    let array = [];

    //페이지 개수만큼 배열 만들기 [1,2,3,...]
    for (var i = 1; i < parseInt(postNum / 10) + 2; i++) {
      array.push(i);
    }

    return (
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {
          // 페이지 개수만큼 버튼 만들기
          array.map((page) => (
            <button
              type='button'
              name={page}
              onClick={(e) => {
                ChangePage(page, menu);
              }}
            >
              {page}
            </button>
          ))
        }
      </div>
    );
  };

  //선택한 페이지 로드
  const ChangePage = (page, menu) => {
    //현재 페이지와 선택한 페이지가 같지 않을 때만 로드
    if (currentPage !== page) {
      let userid = auth.userData.userid;
      if (menu === "myposts") {
        props.getUserposts({ userid, page }).then((res) => {
          setMyPosts(res.payload);
          setCurrentPage(page);
        });
      } else if (menu === "favoriteposts") {
        props.getFavoriteposts({ userid, page }).then((res) => {
          setFavoritePosts(res.payload);
          setCurrentPage(page);
        });
      }
    }
  };

  //선택한 메뉴에 따라 창 로드
  const LoadByMenu = () => {
    if (menu === "myposts") {
      return (
        <>
          <ViewPosts
            posts={myPosts}
            userid={auth.userData.userid}
            menu={"myposts"}
          />
          {SelectPage("myposts")}
        </>
      );
    } else if (menu === "favoriteposts") {
      return (
        <>
          <ViewPosts
            posts={favoritePosts}
            userid={auth.userData.userid}
            menu={"favoriteposts"}
          />
          {SelectPage("favoriteposts")}
        </>
      );
    } else if (menu === "modifyinform") {
      return <UserModify />;
    } else if (menu === "deleteuser") {
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
