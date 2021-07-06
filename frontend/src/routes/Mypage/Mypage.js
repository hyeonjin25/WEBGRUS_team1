import React, { useEffect, useState, useRef } from "react";
import { connect } from "react-redux";

import { getUserposts } from "../../_actions/postAction";
import { getFavoriteposts } from "../../_actions/postAction";

import Loading from "../../component/Loading";
import UserModify from "./UserModify";
import UserDelete from "./UserDelete";
import ViewPosts from "./ViewPosts";
import useInfinteScroll from "../../hoc/infiniteScroll";

import "./Mypage.scss";

function Mypage(props) {
  const auth = props.auth;
  const targetRef = useRef(null);

  const [menu, setMenu] = useState("myposts");
  const [myPosts, setMyPosts] = useState([]);
  const [favoritePosts, setFavoritePosts] = useState([]);
  const [curPage, setCurPage] = useState(0);
  const [isLastPage, setLastPage] = useState(false);

  useEffect(() => {
    //auth action에서 userData를 가져올 때 까지 기다리기
    if (auth.status.auth === "SUCCESS" && auth.isAuth) {
      let userid = auth.userData.userid;

      //해당 유저가 올린 게시물 가져오기
      props.getUserposts({ userid, page: 1 }).then((res) => {
        setMyPosts(res.payload); //첫 10개만
        setCurPage(1);
        setLastPage(false);
      });

      //해당 유저가 좋아한 게시물 가져오기
      props.getFavoriteposts({ userid, page: 1 }).then((res) => {
        setFavoritePosts(res.payload);
        setCurPage(1);
        setLastPage(false);
      });
    }
  }, [auth.status.auth]);

  //해당 유저가 올린 게시물 보여주기
  const onMyPost = () => {
    setMenu("myposts");

    let userid = auth.userData.userid;

    //해당 유저가 올린 게시물 가져오기
    props.getUserposts({ userid, page: 1 }).then((res) => {
      setMyPosts(res.payload); //첫 10개만
      setCurPage(1);
      setLastPage(false);
    });
  };

  //해당 유저가 좋아한 게시물 보여주기
  const onFavoritePost = async () => {
    setMenu("favoriteposts");

    let userid = auth.userData.userid;

    //해당 유저가 좋아한 게시물 가져오기
    await props
      .getFavoriteposts({ userid, page: 1 })
      .then((res) => {
        setFavoritePosts(res.payload);
        setCurPage(1);
        setLastPage(false);
      })
      .catch((err) => {
        setFavoritePosts(null);
      });
  };

  //개인 정보 수정하기
  const onModifyInform = () => {
    setMenu("modifyinform");
  };

  //회원 탈퇴하기
  const onDeleteUser = () => {
    setMenu("deleteuser");
  };

  useInfinteScroll({
    target: targetRef.current,
    onIntersect: ([{ isIntersecting }]) => {
      let userid = auth.userData.userid;
      if (isIntersecting && !isLastPage) {
        if (menu === "myposts") {
          props.getUserposts({ userid, page: curPage + 1 }).then((res) => {
            if (res.payload.length > 0) {
              setMyPosts(myPosts.concat(res.payload));
              setCurPage(curPage + 1);
            } else setLastPage(true);
          });
        } else if (menu === "favoriteposts") {
          props.getFavoriteposts({ userid, page: curPage + 1 }).then((res) => {
            if (res.payload.length > 0) {
              setFavoritePosts(favoritePosts.concat(res.payload));
              setCurPage(curPage + 1);
            } else setLastPage(true);
          });
        }
      }
    },
  });

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
          <div ref={targetRef} />
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
          <div ref={targetRef} />
        </>
      );
    } else if (menu === "modifyinform") {
      return <UserModify />;
    } else if (menu === "deleteuser") {
      return <UserDelete />;
    }
  };

  const RenderBottom = () => {
    if (menu === "modifyinform" || menu === "deleteuser")
      return <div className='bottom'></div>;
    else return <div />;
  };

  // 나의 계정이 확인 된 후 로드
  if (auth.status.auth === "SUCCESS") {
    return (
      <div className='mypage-container'>
        <div className='top-menu'>
          <div className='left'>
            <button type='button' onClick={onMyPost}>
              {menu === "myposts" ? (
                <span style={{ fontFamily: "notoBold" }}>내 게시물</span>
              ) : (
                <>내 게시물</>
              )}
            </button>
            <span className='separator' />
            <button type='button' onClick={onFavoritePost}>
              {menu === "favoriteposts" ? (
                <span style={{ fontFamily: "notoBold" }}>좋아한 게시물</span>
              ) : (
                <>좋아한 게시물</>
              )}
            </button>
          </div>
          <div className='right'>
            <button type='button' onClick={onModifyInform}>
              {menu === "modifyinform" ? (
                <span style={{ fontFamily: "notoBold" }}>개인정보 수정</span>
              ) : (
                <>개인정보 수정</>
              )}
            </button>
            <span className='separator' />
            <button type='button' onClick={onDeleteUser}>
              {menu === "deleteuser" ? (
                <span style={{ fontFamily: "notoBold" }}>회원 탈퇴</span>
              ) : (
                <>회원 탈퇴</>
              )}
            </button>
          </div>
        </div>

        {/* 메뉴 */}
        <div className='main'>
          {LoadByMenu()}
          {RenderBottom()}
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
