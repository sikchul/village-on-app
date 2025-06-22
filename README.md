# App Template

- 초기 세팅 테플릿

## A. Root

### capcacitor.config.ts

- 앱 빌드 관련 설정
- appId, appName, webDir 설정 값 프로젝트에 맞게 수정

### drizzle.config.ts

- database 관련 설정
- 스키마, migration 경로 프로젝트에 맞게 수정

### ionic.config.json

- ionic 관련 설정.
- 프로젝트에 맞게 name 수정

## B. shared/\*\*

### database/client.ts

- db 세팅

### types/props.ts

- 컴포넌트 props 기본 타입 정의

### constants/config.ts

- env 값 객체 정의

### api/supabase.ts

- supabase client 세팅

### api/open-api/script.ts

- open api db 를 supabase postgresql db 로 업데이트 하는 스크립트

## C. package script

### dev, build, lint

- 로컬 앱 실행, 빌드, 린트 수정

### build:script, start:script

- db 업데이트 스크립트 빌드
- db 업데이트 스크립트 실행

### db:generate, db:migration, db:typegen

- 작성된 스키마 기반 업데이트
- db 기반 타입 자동 생성

### build:android, run:android

- 빌드 후 안드로이드 애뮬레이터 실행

## D. 참고

- https://ionicframework.com/docs/react/quickstart
- https://capacitorjs.com/docs/getting-started
