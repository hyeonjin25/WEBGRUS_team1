API 문서
=======

폴더 내부에서 API에 대한 자세한 정보를 확인할 수 있습니다.
- `{userid}` 유저의 ID입니다.
- `{postid}`는 MongoDB의 ObjectDB를 그대로 사용합니다.

인증이 필요하지 않은 API
--------------------

- `POST /api/auth/login` : 로그인
- `POST /api/users` : 회원가입 (새로운 유저 생성)

- `GET /api/posts/content/{postid}` : 특정 글의 정보 표시
- `GET /api/posts/users/{userid}` : 작성자가 `{userid}`인 유저가 작성한 글 표시
- `GET /api/posts/favorites/{userid}` : `{userid}`가 좋아요 표시한 모든 글 표시
- `GET /api/posts/all` : 모든 글의 정보 표시

인증이 필요한 API
--------------

### 테스트

- `POST /api/auth/check` : 현재 토큰 검증 (테스트용)

### 계정

- `POST /api/auth/logout` : 로그아웃
- `GET /api/users/{userid}` : id가 `{userid}`인 유저의 정보 표시
- `PUT /api/users/{userid}` : id가 `{userid}`인 유저의 정보 업데이트 (미구현)
- `DELETE /api/users/{userid}` : id가 `{userid}`인 유저의 정보 삭제 (미구현)
- `PUT /api/users/following/{userid}` : id가 `{userid}`인 유저에 대해 팔로우 상태를 토글한다.

### 글 작성자

- `POST /api/posts` : 글 생성
- `PUT /api/posts/{postid}` : id가 `{postid}`인 글 업데이트
- `DELETE /api/posts/{postid}` : id가 `{postid}`인 글 삭제

### 글 열람

- `PUT /api/users/favorites/:postid`: id가 `{postid}`인 글에 좋아요 토글
- `GET /api/users/favorites/:postid`: id가 `{postid}`인 글의 좋아요 여부 확인

- `POST /api/posts/{postid}/comments`: id가 `{postid}`인 글에 댓글 추가
- `PUT /api/posts/{postid}/comments/{commentid}`: id가 `{postid}`인 글에 id가 `{commentid}`인 댓글 수정
- `DELETE /api/posts/{postid}/comments/{commentid}`: id가 `{postid}`인 글에 인덱스가 `{commentid}`인 댓글 제거