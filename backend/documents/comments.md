글 작성하기
=========

## 1. 댓글 작성하기

`POST /api/posts/:postid/comments`

댓글을 작성할 때에는 다음과 같은 json 형식으로 정보를 전송한다.
댓글 작성을 위해서는 계정이 필요하므로, 헤더에 발급받은 jwt 토큰을 포함해야 한다.

```
{
    "content": "Placeholder" // 댓글의 내용
}
```

## 2. 댓글 열람하기

현재로서는 댓글만을 읽는 방법은 없고, 글의 정보를 읽어올 때 다음과 같은 형식으로 된 댓글 정보를 확인할 수 있다.

```
{
    _id: ObjectId('5ffd786a29ede9409c831148'),
    description: '',
    tags: [],
    viewcnt: 0,
    likecnt: 0,
    commentcnt: 1,
    title: 'Sample Post',
    files: [
        {
            _id: ObjectId('5ffd786a29ede9409c831149'),
            originalname: '19119_en_1.jpg',
            filename: '00b17d09aba2f3e4c4ec26eba9e44c4c'
        },
        {
            _id: ObjectId('5ffd786a29ede9409c83114a'),
            originalname: '19950_en_1.jpg',
            filename: '066c35d6ca4aeedb653e2f1c7be51b4d'
        }
    ],
    owner: 'sampleid',
    posttime: ISODate('2021-01-12T10:22:34.116Z'),
    modifytime: ISODate('2021-01-12T10:22:34.116Z'),
    // 댓글의 정보가 담긴 array
    comments: [
        {
            _id: ObjectId('5ffd794529ede9409c83114e'),
            content: 'Placeholder',
            owner: 'sampleid',
            posttime: ISODate('2021-01-12T10:26:13.869Z'),
            modifytime: ISODate('2021-01-12T10:26:13.869Z')
        }
    ],
    __v: 0
}
```

## 3. 댓글 수정하기

`PUT /api/posts/:postid/comments/:commentid`

위 uri로 댓글의 description (내용)을 수정한다. modifytime은 자동으로 갱신된다.
수정할 내용을 댓글을 작성할 때와 같은 json의 형태로 전송하면 된다.
이때 jwt 토큰으로 현재 유저와 글의 작성자가 같은지 확인하는 과정을 거친다.

## 4. 글 삭제하기 

`DELETE /api/posts/:postid/comments/:commentid`

위 uri로 특정 댓글을 지운다.
jwt 토큰으로 댓글의 글쓴이와 현재 로그인된 유저가 같은지 확인한다.
