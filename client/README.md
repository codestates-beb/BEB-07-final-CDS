```bash
> sudo npm run start
```

위 명령어를 쳤을 때 localhost:{지정 PORT} 로 브라우저에서 
`Hello World`를 표시해주면, 그리고 밑줄이 그어져 있으면
잘 작동하고 있는 것입니다.


```
+-- src
    +-- app: Redux Store를 관리하는 곳입니다.
    +-- asstes: css 나 이미지를 관리하는 곳입니다.(이미지는 public에서 관리하는게 더 낫습니다 )
    +-- components: 리액트 컴포넌트들을 관리하는 곳입니다.
    +-- features: Redux 관련 reduce, actions 함수들을 관리하는 곳입니다.
    +-- pages: 페이지 단위의 컴포넌트를 관리하는 곳입니다.
    +-- utils: 여러 유용함수들을 관리하는 곳입니다. 컴포넌트에 종속되지 않는 함수들, 이를테면 순수함수들을 여기서 관리하세요.
```