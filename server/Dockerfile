FROM node:16

# 앱 디렉터리 생성
WORKDIR /usr/cdsapi

# 앱 의존성 설치
# 가능한 경우(npm@5+) package.json과 package-lock.json을 모두 복사하기 위해
# 와일드카드를 사용
COPY package*.json ./

# RUN npm install
# 프로덕션을 위한 코드를 빌드하는 경우
RUN npm install -g npm@9.4.1
RUN npm i
RUN npm install -g pm2

# 앱 소스 추가
COPY . .
RUN npx tsc
RUN mkdir dist/swagger
RUN cp src/swagger/cds.yaml dist/swagger

EXPOSE 80 8080
CMD [ "pm2-runtime", "start", "dist/index.js" ]
