import React, { useEffect, useRef, useState } from "react";
import { connect, useDispatch } from "react-redux";

import { getAllpost } from "../_actions/postAction";

import Post from "../component/Post";
import Loading from "../component/Loading";
import useInfinteScroll from "../hoc/infiniteScroll";
import styled from "styled-components";

const SortButton=styled.button`
  &:before {
    content : "|  ";
    color: #6E933E;
    font-weight : 900;
    position: relative;
    right:3px
  }
  &:first-child:before {
    content : ''
  }
`

function Main(props) {
  const dispatch = useDispatch();
  const targetRef = useRef(null);

  const [sortMode, setSortMode] = useState("times");
  const [posts, setPosts] = useState([]);
  const [curPage, setCurPage] = useState(0);
  const [isLastPage, setLastPage] = useState(false);

  const changeSortMode = (sort) => {
    setLastPage(false);
    setSortMode(sort);
    dispatch(getAllpost(sort, 1)).then((res) => {
      setPosts(res.payload);
      setCurPage(1);
    });
  };

  useEffect(() => {
    setLastPage(false);
    dispatch(getAllpost("times", 1)).then((res) => {
      setPosts(res.payload);
      setCurPage(1);
    });
  }, []);

  useInfinteScroll({
    target: targetRef.current,
    onIntersect: ([{ isIntersecting }]) => {
      if (isIntersecting && !isLastPage) {
        dispatch(getAllpost(sortMode, curPage + 1)).then((res) => {
          if (res.payload.length > 0) {
            setPosts(posts.concat(res.payload));
            setCurPage(curPage + 1);
          } else setLastPage(true);
        });
      }
    },
  });

  //모든 포스트 가져오는 액션이 끝난 후 로드
  if (props.post.allpost) {
    return (
      <>
        {/* 정렬버튼 */}
        <div style={{fontSize:16}}>
          <SortButton
            type='button'
            name='times'
            onClick={() => {
              changeSortMode("times");
            }}
          >
            최신순
          </SortButton>
          <SortButton
            type='button'
            name='views'
            onClick={() => {
              changeSortMode("views");
            }}
          >
            조회순
          </SortButton>
          <SortButton
            type='button'
            name='likes'
            onClick={() => {
              changeSortMode("likes");
            }}
          >
            인기순
          </SortButton>
        </div>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <div
            style={{
              width: "80%",
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "flex-start",
              padding: 5
            }}
          >
            {posts
              ? posts.map((post) => (
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
                ))
              : ""}
          </div>
        </div>
        <div ref={targetRef} />
      </>
    );
  } else {
    return <Loading />;
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  post: state.post,
});

export default connect(mapStateToProps)(Main);
