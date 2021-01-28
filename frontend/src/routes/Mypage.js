import React, { useEffect, useState } from "react";
import { connect } from "react-redux";

import { getUserposts } from "../_actions/postAction";
import { getFavoriteposts } from "../_actions/postAction";

import Post from "../component/Post";
import Loading from "../component/Loading";
import Axios from "axios";

function Mypage(props) {
  const auth = props.auth;

  const [Menu, setMenu] = useState("myposts");
  const [MyPosts, setMyPosts] = useState([]);
  const [FavoritePosts, setFavoritePosts] = useState([]);
  const [OldPW, setOldPW] = useState(""); //변경하기 전 비번
  const [NewPW, setNewPW] = useState(""); //변경할 비번
  const [Email, setEmail] = useState(""); //변경할 이메일
  const [PW, setPW] = useState(""); //탈퇴할 때 필요한 비번

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

  const changeOldPW = (e) => {
    setOldPW(e.target.value);
  };

  const changeNewPW = (e) => {
    setNewPW(e.target.value);
  };

  const changeEmail = (e) => {
    setEmail(e.target.value);
  };

  const changePW = (e) => {
    setPW(e.target.value);
  };

  const clickModify = (e) => {
    e.preventDefault();
    let body = {
      oldpassword: OldPW,
      useremail: Email,
      password: NewPW,
    };
    Axios.put(`${SERVER_API}/api/users`, body)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const clickDelete = (e) => {
    e.preventDefault();
    let body = {
      password: PW,
    };
    Axios.delete(`${SERVER_API}/api/users`, body)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  //선택한 메뉴에 따라 창 로드
  const LoadByMenu = () => {
    if (Menu === "myposts") {
      console.log("mypost");
      return (
        <>
          <div>{auth.userData.userid}님의 게시물 입니다</div>

          <div
            style={{
              width: "90%",
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "flex-start",
            }}
          >
            {ViewMyPosts}
          </div>
        </>
      );
    } else if (Menu === "favoriteposts") {
      return (
        <>
          <div>{auth.userData.userid}님이 좋아한 게시물 입니다</div>

          <div
            style={{
              width: "90%",
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "flex-start",
            }}
          >
            {ViewFavoritePosts}
          </div>
        </>
      );
    } else if (Menu === "modifyinform") {
      return (
        <div style={{ height: "100vh" }}>
          <div>
            현재 비밀번호:{" "}
            <input type='text' name='oldpassword' onChange={changeOldPW} />
          </div>
          <br />
          <div>
            변경할 비밀번호:{" "}
            <input type='text' name='password' onChange={changeNewPW} />
          </div>
          <br />
          <div>
            변경할 이메일:{" "}
            <input type='text' name='useremail' onChange={changeEmail} />
          </div>
          <button type='submit' onClick={clickModify}>
            변경하기
          </button>
        </div>
      );
    } else if (Menu === "deleteuser") {
      return (
        <div style={{ height: "100vh" }}>
          탈퇴하면 모든 게시물이 삭제됩니다...
          <br />
          <div>
            비밀번호:{" "}
            <input type='text' name='oldpassword' onChange={changePW} />
          </div>
          <button type='submit' onClick={clickDelete}>
            탈퇴하기
          </button>
        </div>
      );
    }
  };

  const ViewMyPosts = (
    <>
      {/* 내가 올린 게시물이 있을 경우 */}
      {MyPosts.length !== 0 ? (
        MyPosts.map((post) => (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
            }}
            key={post._id}
          >
            <Post
              key={post._id}
              postid={post._id}
              owner={post.owner}
              title={post.title}
              description={post.description}
              files={post.files}
              tags={post.tags}
              posttime={post.posttime}
              likecnt={post.likecnt}
              viewcnt={post.viewcnt}
              commentcnt={post.commentcnt}
            />
          </div>
        ))
      ) : (
        // 내가 올린 게시물이 없을 경우
        <div
          style={{
            width: "1000px",
            height: "100vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          게시물이 없습니다...
        </div>
      )}
    </>
  );

  const ViewFavoritePosts = (
    <>
      {/* 내가 좋아한 게시물이 있을 경우 */}
      {FavoritePosts.length !== 0 ? (
        FavoritePosts.map((post) => (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
            }}
            key={post._id}
          >
            <Post
              key={post._id}
              postid={post._id}
              owner={post.owner}
              title={post.title}
              description={post.description}
              files={post.files}
              tags={post.tags}
              posttime={post.posttime}
              likecnt={post.likecnt}
              viewcnt={post.viewcnt}
              commentcnt={post.commentcnt}
            />
          </div>
        ))
      ) : (
        // 내가 좋아한 게시물이 없을 경우
        <div
          style={{
            width: "1000px",
            height: "100vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          게시물이 없습니다...
        </div>
      )}
    </>
  );

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
    return <Loading />;
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { getUserposts, getFavoriteposts })(
  Mypage
);
