# 🎬 O+T: 취향을 열고, 콘텐츠를 잇다

 <img width="500" alt="intro" src=".github/readme/intro.png" />

<br/>

## 💎 프로젝트 개요

> **O+T**는 시청 데이터 기반 개인화 추천부터 추천 근거 제시까지 책임지는 새로운 OTT 플랫폼입니다.

| 항목           | 내용                                       |
| :------------- | :----------------------------------------- |
| **프로젝트명** | **O+T** (Open The Taste)                   |
| **주제**       | 데이터 분석 기반 맞춤형 콘텐츠 추천 서비스 |
| **타겟층**     | 콘텐츠 선택 장애를 겪는 모든 OTT 사용자    |
| **개발 기간**  | 2025.02.04 ~ 2025.03.20 (약 6주)           |
| **팀 구성**    | 7명 (프론트엔드 3명, 백엔드 4명)           |

### 페인포인트

<p align="center">
  <img width="45%" src=".github/readme/servey.png" />
  <img width="45%" src=".github/readme/pain-point.png" />
</p>

- **불투명한 추천 근거**: 설문 응답자의 71.4%가 수치화된 근거를 원할 만큼, 기존 서비스의 일방적인 추천으로 인한 시청 동기 부여 부재

- **낮은 개인화 체감**: 사용자 개개인의 취향이 반영되지 않은 천편일률적인 추천 구조로 인한 서비스 몰입도 저하

- **과도한 정보와 탐색 피로**: 쏟아지는 콘텐츠 속에서 선택지를 좁히지 못해 발생하는 무의미한 탐색 반복 및 유저 이탈

<br/>

### 차별화 요소

<img width="500" alt="main" src=".github/readme/special.png" />

- **데이터 기반 추천 결과에 대한 근거 제시**: 추천 근거를 제시함으로써 유저가 서비스에 대한 신뢰성 향상
- **커스텀 추천으로 추천 구조 선택**: 개인화된 추천 서비스를 바탕으로 유저의 서비스 이용 향상
- **감정 환기 AI 모델 사용한 추천 구조 환기 시스템**: 반복된 추천 구조에서 감정 환기 모델로 리프레시 적용

<br/>

## 🚀 주요 기능

### 1. 콘텐츠 추천

|                 관심사 태그 선택                 |           콘텐츠 추천            |
| :----------------------------------------------: | :------------------------------: |
| ![interest-tag](.github/readme/interest-tag.gif) | ![home](.github/readme/home.gif) |

- 상단 캐러셀 뷰를 통해 다양한 콘텐츠 추천
- 실시간 인기 차트, 시청 내역을 통한 추천 콘텐츠, 사용자가 시청 중인 콘텐츠를 순서대로 나열하여 안내
- 온보딩 또는 프로필 수정 페이지에서 선택했던 선호 태그별 추천 콘텐츠를 나열하여 안내

<br/>

### 2. 영상 플레이어(Player)

|               플레이어               |    PIP (Picture-In-Picture)    |
| :----------------------------------: | :----------------------------: |
| ![player](.github/readme/player.gif) | ![pip](.github/readme/pip.gif) |

- 전체 화면 플레이어 재생, seek bar로 탐색, 현재/전체 재생 시간 표시
- 배속 선택 (1x, 1.25x 등) 및 화질 선택 (Auto, 360p, 720p, 1080p) 및 ABR 자동 전환
- PIP 버튼으로 미니 플레이어 전환, 다른 페이지 이용 중에도 시청 가능
- 영상 종료 전 다음 콘텐츠 자동재생 안내 배너 표시
  - 시리즈 에피소드의 경우, 5초 뒤 다음 화 자동재생
  - 단편 콘텐츠의 경우, 15초 뒤 다음 콘텐츠 연속재생

<br/>

### 3. 숏폼(ShortForm)

|                숏폼 스크롤                 |                    숏폼의 원본 콘텐츠로 이동                     |
| :----------------------------------------: | :--------------------------------------------------------------: |
| ![shortform](.github/readme/shortform.gif) | ![shortform-to-content](.github/readme/shortform-to-content.gif) |

- 짧은 영상(쇼츠) 형태로 콘텐츠 하이라이트, 예고편 등 제공
- 스와이프/스크롤 기반 UI로 빠르고 직관적인 탐색
- 좌측 하단에 원본 콘텐츠 링크, 업로드, 업로드 날짜 표시
- 숏폼 영상 왼쪽의 원본 콘텐츠 링크 버튼 클릭 시, 해당 숏폼이 생성된 원본 콘텐츠의 상세 페이지로 이동

<br/>

### 4. 커스텀 추천 로직 기능

|             커스텀 추천              |                커스텀 템플릿 기반 추천                 |
| :----------------------------------: | :----------------------------------------------------: |
| ![custom](.github/readme/custom.gif) | ![custom-templete](.github/readme/custom-templete.gif) |

- 대중성, 몰입도, 마니아, 최신성, 재시청률 총 5개의 요소에 100 포인트를 각각 분배하여 원하는 추천 로직 커스텀 가능
- 오른쪽 드롭다운을 통해 커스텀 템플릿 선택 가능
- 아래 안내 가이드를 통해 각 요소가 어떤 뜻인지 파악 가능
- 추천 미리보기를 통해 어떤 콘텐츠들이 추천되었는지 표기하며 추천이 맘에 들지 않을 경우 재시도 가능

<br/>

### 5. AI 감정 카드 & 추천 콘텐츠 안내 기능

| AI 감정 카드 및 추천 콘텐츠  |
| :--------------------------: |
| ![ai](.github/readme/ai.gif) |

- AI를 통해 비슷한 감정 데이터를 가진 콘텐츠를 연속해서 3번 시청 시, 해당 감정과 반대되는 감정 데이터의 콘텐츠들 추천
- 홈 화면의 캐러셀 뷰 첫 번째에 현재 감정이 무엇인지 알려주는 카드와 문구 표기 (6시간 지속)
- 알고리즘이 사용자의 데이터를 기반으로 취향에 맞는 정보만 선별해 제공하여 필터버블(Filter Bubble) 현상 발생 가능 → 현재 감정과 반대되는 컨텐츠들을 추천해 확증 편향을 완화시킴
- 문구 아래에 반대되는 감정 데이터를 가진 콘텐츠 3개 추천

<br/>

### 6. 시청 통계

|            시청 통계             |  태그별 시청 비교 그래프 및 추천 콘텐츠  |
| :------------------------------: | :--------------------------------------: |
| ![stat](.github/readme/stat.gif) | ![stat-tag](.github/readme/stat-tag.gif) |

- 사용자의 시청 기록을 통해 태그별로 구분하여 원그래프 표시
- 상위 4개 태그별로 구분하고, 나머지는 “기타”로 묶음
- 상위 4개 태그 각각 클릭 시 해당하는 태그의 상세 통계가 정리되어 있는 모달이 열림
  - 전월과 금월 해당 태그의 시청 횟수를 비교해주는 그래프 표시
  - 해당 태그의 추천 콘텐츠 리스트 표시
- 신규 사용자 또는 전월 기록이 없다면, 금월만 그래프에 표시

<br/>

## 🛠️ 기술 스택

| 분야          | 기술 스택                                                                                                                                                                                                                                                                                                                                                                                                                         |
| ------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Frontend**  | ![Next.js](https://img.shields.io/badge/Next.js-000000?style=flat&logo=nextdotjs&logoColor=white) ![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat&logo=TypeScript&logoColor=white) ![TailwindCSS](https://img.shields.io/badge/TailwindCSS-06B6D4?style=flat&logo=TailwindCSS&logoColor=white) ![Framer Motion](https://img.shields.io/badge/Framer_Motion-EF4EAF?style=flat&logo=framer&logoColor=white) |
| **상태 관리** | ![TanStack Query](https://img.shields.io/badge/TanStack_Query-FF4154?style=flat&logo=reactquery&logoColor=white) ![Zustand](https://img.shields.io/badge/Zustand-000000?style=flat&logo=zustand&logoColor=white)                                                                                                                                                                                                                  |
| **API 통신**  | ![Axios](https://img.shields.io/badge/Axios-5A29E4?style=flat) ![RESTful API](https://img.shields.io/badge/RESTful_API-000000?style=flat&logo=OpenAPI-Initiative&logoColor=white)                                                                                                                                                                                                                                                 |
| **인증**      | ![JWT](https://img.shields.io/badge/JWT-000000?style=flat&logo=jsonwebtokens&logoColor=white) ![Kakao](https://img.shields.io/badge/Kakao_Login-FFCD00?style=flat&logo=KakaoTalk&logoColor=black)                                                                                                                                                                                                                                 |
| **코드 품질** | ![ESLint](https://img.shields.io/badge/ESLint-4B32C3?style=flat&logo=ESLint&logoColor=white) ![Prettier](https://img.shields.io/badge/Prettier-F7B93E?style=flat&logo=Prettier&logoColor=black) ![Husky](https://img.shields.io/badge/Husky-000000?style=flat)                                                                                                                                                                    |
| **기타**      | ![Lucide](https://img.shields.io/badge/Lucide_Icons-000000?style=flat)                                                                                                                                                                                                                                                                                                                                                            |

<br/>

## 📦 폴더 구조

```
src/
├── app/          # 라우트 진입점 (Next.js App Router)
├── layouts/      # 페이지 공통 골격
├── features/     # 기획 단위 기능
├── entities/     # 도메인 개념 단위
└── shared/       # 레포 내부 공통 인프라
```

<br/>

## 💡 HLS 기반 영상 스트리밍 구조

| 스트리밍 구조                                               | 설명                                                                                                                                                                                                                                                                                                                                                                           |
| ----------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| <img width="512" alt="main" src=".github/readme/hls.png" /> | **계층적 스트림 관리** — 마스터 playlist(`master.m3u8`)가 해상도별 playlist로 분기되고, 각 playlist는 초 단위로 분할된 세그먼트(.ts) 파일로 구성됩니다. <br/><br/> **적응형 스트리밍(ABR)** — 클라이언트가 네트워크 속도와 디바이스 성능을 실시간 감지해 최적 해상도의 segment를 자동으로 선택합니다. 네트워크 상태에 따라 해상도가 자동 전환되어 끊김 없는 재생을 유지합니다. |

<br/>

## 🖥️ 로컬 개발 환경

1. **의존성 설치**

   ```bash
   npm install
   ```

2. **환경변수 설정**
   - `.env` 파일에 API 서버 주소, 카카오 키 등 입력

3. **개발 서버 실행**
   ```bash
   npm run dev
   ```

<br/>

## 📌 WE ARE TEAM OF O+T

|                  이름                   | 역할                     |
| :-------------------------------------: | :----------------------- |
| [강현우](https://github.com/hyunw-kang) | TL, FE, Design           |
|   [김주희](https://github.com/joooii)   | Front Leader, FE, Design |
| [유재휘](https://github.com/RyuJaeHwi)  | FE, Design               |
