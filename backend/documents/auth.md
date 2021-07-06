계정 관리
=======

## 1. 계정 만들기

`POST /api/users`

다음과 같은 json 형식으로 전송하면 DB에 계정 정보가 추가된다.
형식이 다르거나 오류가 발생한 경우에는 status code 400을 return한다.

```
{
    "username": {
        "firstname": "first",
        "lastname": "last"
    },
    "userid": "sampleid",
    "useremail": "example@email.com",
    "password": "password"
}
```

## 2. 계정 정보로 jwt 토큰 발급

`POST /api/auth/login`

다음과 같은 json 형식으로 전송하면 id와 password가 DB상에 존재할 경우 jwt 토큰을 발급하고, 아니면 status code 400으로 'undefined' 토큰을 return한다. 

```
{
    "userid": "testid",
    "password": "password"
}
```

## 3. jwt 토큰의 유효성 검증

`POST /api/auth/check`
Bearer Token을 2에서 발급받은 토큰으로 하고 전송하면 유효한 토큰인 경우 status code 200을 return한다. 이 uri는 단순히 토큰 확인이 제대로 작동하는지 확인하기 위한 uri로, 실제로 쓰이지는 않는다.

실제 백엔드에서 토큰을 검증하려면 controller fuction을 만들고 라우터에서 다음과 같이 middleware를 설정해주면 된다.

```
router.post( // HTTP method에 따라 함수가 달라짐
    "/check", // 라우팅할 uri
    passport.authenticate('jwt', { session: false }), // middleware
    authController.checkAuth // controller function
);
```
