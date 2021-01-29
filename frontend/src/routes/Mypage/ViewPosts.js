import React from "react";

import Post from "../../component/Post";

function ViewPosts({ posts, userid, menu }) {

  const ViewMyPosts = (
    <>
      {/* 내가 올린 게시물이 있을 경우 */}
      {posts.length !== 0 ? (
        posts.map((post) => (
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

  const Message = () => {
    if (menu === "myposts") {
      return <div>{userid}님의 게시물 입니다</div>;
    } else if (menu === "favoriteposts") {
      return <div>{userid}님이 좋아한 게시물 입니다</div>;
    }
  };

  return (
    <>
      {Message()}
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
}

export default ViewPosts;
