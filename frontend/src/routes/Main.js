import React, { useEffect, useState } from "react";
import { connect, useDispatch } from "react-redux";

import { getAllpost } from "../_actions/postAction";

import Post from "../component/Post";
import Loading from "../component/Loading";
import Axios from "axios";
import { SERVER_API } from "../_actions/config";

function Main(props) {
  const dispatch = useDispatch();

  const [Posts, setPosts] = useState([]);

  //모든 포스트 가져오기
  useEffect(() => {
    dispatch(getAllpost()).then((res) => {
      setPosts(res.payload);
    });
  }, []);
  const PostSorting = (e, sort) => {
    console.log(sort);
    Axios.get(`${SERVER_API}/api/posts/all?sortby=${sort}`)
    .then((res) =>{
      console.log(res)
      setPosts(res.data)}
    );
  };

  //모든 포스트 가져오는 액션이 끝난 후 로드
  if (props.post.allpost) {
    return (
      <>
        {/* 정렬버튼 */}
        <div>
          <button
            type='button'
            name='times'
            onClick={(e) => {
              PostSorting(e, "times");
            }}
          >
            최신순
          </button>
          <button
            type='button'
            name='views'
            onClick={(e) => {
              PostSorting(e, "views");
            }}
          >
            조회순
          </button>
          <button
            type='button'
            name='likes'
            onClick={(e) => {
              PostSorting(e, "likes");
            }}
          >
            인기순
          </button>
        </div>

        <div style={{ display: "flex", justifyContent: "center" }}>
          <div
            style={{
              width: "80vw",
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "flex-start",
            }}
          >
            {Posts
              ? Posts.map((post) => (
                  <div
                    key={post._id}
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      flexWrap: "wrap",
                    }}
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
                      auth={props.auth.userData}
                    />
                  </div>
                ))
              : ""}
          </div>
        </div>
      </>
    );
  } else {
    return <Loading />;
  }
}

const mapStateToProps = (state) => ({
  auth:state.auth,
  post: state.post,
});

export default connect(mapStateToProps)(Main);
