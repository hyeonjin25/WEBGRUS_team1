# 디자이너 포트폴리오 사이트

(Create React App을 이용함)

- npm start로 시작 가능
- 시작 전 npm install 필요

## 구성

#### 네비게이션 바

component/bar/Navbar.js

- 모든 페이지 상단에 공통으로 적용
- 기능

  - 왼쪽 : 사이트 로고를 클릭시 메인페이지로 이동
  - 오른쪽 : 로그인, 회원가입, 디자인 올리기, 마이페이지, 로그아웃 버튼 띄움

- 컴포넌트:
  - 오른쪽 기능 컴포넌트 : component/Rightnav.js
  - 유저메뉴 컴포넌트 : component/menubar.js (Rightnav.js에서 사용)

component/Rightnav.js

- 로그인 했을 경우 : 디자인 올리기, 유저메뉴(마이페이지, 로그아웃) 버튼 띄움
- 로그인 하지 않았을 경우 : 로그인, 회원가입 버튼 띄움

component/menubar.js

- 클릭시 마이페이지, 로그아웃 버튼 띄움

#### 푸터

component/bar/Footer.js

- 모든 페이지 하단에 공통으로 적용
- 사이트 정보 제공 (미구현)

## 페이지 소개

#### 1. 메인페이지

routes/Main.js

- 아무나 접근 가능
- 기능
  - 게시물 정렬 기능 (미구현)
  - 태그 검색 기능 (미구현)
- 컴포넌트:
  - 각각의 게시물 컴포넌트 : component/Post.js

component/Post.js

- 작성자, 첫번째 사진, 제목, 작품설명 앞부분, 태그, 올린 날짜, 좋아요 수, 뷰 수, 댓글 수 볼 수 있음
- 로그인 한 사람만 좋아요 누르기 가능
- 좋아요 컴포넌트 : component/FavoriteComponent.js

#### 2. 게시물 업로드 페이지

routes/Newpost.js

- 로그인 한 사람만 접근 가능
- 기능
  - 제목, 작품설명, 태그, 이미지 업로드 가능
  - 이미지 업로드 기능은 react-dropzone 사용함

#### 3. 마이페이지

routes/Mypage.js

- 로그인 한 사람만 접근 가능
- 기능
  - 자신이 업로드한 게시물들 모아 볼 수 있음
- 컴포넌트:
  - 각각의 게시물 컴포넌트 : component/Post.js (메인페이지에서 부른 컴포넌트와 동일)

#### 4. 파일 상세보기 페이지

routes/PostDetail.js

- 아무나 접근 가능
- 기능:
  - 로그인 돼있을 경우 게시물 수정, 삭제 가능
  - 로그인 안돼있을 경우 작성자 팔로우 가능
  - 로그인 여부에 상관없이 게시물 상세보기 및 댓글보기 가능
- 컴포넌트:
  - 게시물 상세보기 컴포넌트 : component/ViewPostDetail.js
  - 댓글보기 컴포넌트 : component/CommentComponent.js
  - 작성자 팔로우 컴포넌트 : component/FollowComponent.js

component/ViewPostDetail.js

- PostDetail.js에 보여질 게시물 구성 (제목, 작품설명, 태그, 이미지, 올린날짜 보여줌)

component/CommentComponent.js

- PostDetail.js에 보여질 댓글 구성 (댓글 입력창, 달린 댓글들)
- 댓글 입력은 로그인 돼있을 경우만 가능

#### 5. 유저 상세보기 페이지

routes/UserDetail.js

- 아무나 접근 가능
- 포스트의 작성자를 클릭하여 접근 가능
- 기능:
  - 해당 유저가 올린 게시물들을 볼 수 있음
  - 해당 유저를 팔로우 할 수 있음
- 컴포넌트:
  - 각각의 게시물 컴포넌트 : component/Post.js (메인페이지에서 부른 컴포넌트와 동일)
  - 작성자 팔로우 컴포넌트 : component/FollowComponent.js (파일 상세보기 페이지에서 부른 컴포넌트와 동일)

#### 6. 게시물 수정 페이지

routes/PostModify.js

- 게시물을 올린 작성자만 접근 가능
- 기능:
  - 게시물의 제목, 작품설명, 태그, 이미지 변경 가능 (게시물 업로드 페이지와 비슷)

#### 7. 검색 페이지 (미구현)

#### 8. 로그인 페이지

routes/LoginPage.js

- 로그인 안 돼있을 경우만 접근 가능
- 기능:
  - 로그인 기능 (아이디와 비밀번호 필수 입력)

#### 9. 회원가입 페이지

routes/RegisterPage.js

- 로그인 안 돼있을 경우만 접근 가능
- 기능:
  - 회원가입 기능 (성, 이름, 아이디, 이메일, 비밀번호, 비밀번호확인 필수 입력)
