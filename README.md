# KIKAE — Next.js

원본 [KIKAE Framer 사이트](https://kikae.framer.website/)를 참고한 Next.js App Router + TypeScript 구현입니다. 이전 HTML 시안은 `../kikae-rebuild`에 그대로 보관했습니다.

## 실행

Node.js 24.x와 pnpm 11.25.0을 사용합니다. Vercel에서도 Node.js 24.x를 사용하도록 지정했습니다.

```sh
npm install -g pnpm@11.25.0
pnpm install --frozen-lockfile
pnpm dev
```

개발 주소: http://localhost:3000

```sh
pnpm build
pnpm start
```

## Vercel 배포

1. 이 폴더를 Git 저장소에 올린 후 Vercel의 **Add New → Project**에서 가져옵니다.
2. 여러 프로젝트를 포함한 저장소라면 **Root Directory**를 `kikae-nextjs`로 지정합니다. 이 폴더만 올렸다면 기본값을 사용합니다.
3. **Framework Preset: Next.js**, **Build Command 및 Output Directory: 기본값**으로 둡니다. `vercel.json`에 pnpm 버전을 고정한 설치·빌드 명령이 포함되어 있으며 잠금 파일도 제공합니다.
4. 자체 도메인이 있다면 환경 변수 `NEXT_PUBLIC_SITE_URL`에 `https://사용할도메인`을 설정합니다. 생략하면 Vercel의 `VERCEL_PROJECT_PRODUCTION_URL`을 자동으로 사용합니다. 로컬에서는 `http://localhost:3000`입니다.
5. **Deploy**를 누릅니다. 도메인을 나중에 변경했다면 환경 변수 수정 후 재배포합니다.

CLI를 사용하는 경우 이 폴더에서 `vercel`로 미리보기 배포, `vercel --prod`로 프로덕션 배포할 수 있습니다. 실제 Vercel 계정 연결 및 배포는 이번 작업에 포함하지 않았습니다.

## 페이지와 편집 위치

| 주소 | 구현 |
| --- | --- |
| `/` | `app/page.tsx` |
| `/about-me` | `app/about-me/page.tsx` |
| `/contact` | `app/contact/page.tsx` |
| `/page` | `app/page/page.tsx` — VIEW |
| `/projects/[slug]` | `app/projects/[slug]/page.tsx` — 제품 상세 4개 |

- `lib/content.ts`, `lib/product-details.json`: 제품과 서비스 문구
- `components/header.tsx`: PC 메뉴 및 모바일 전체 화면 메뉴
- `components/motion.tsx`: 스크롤 등장, 커서, 영상 재생
- `app/globals.css`: PC / 태블릿(810–1199px) / 모바일(809px 이하) 스타일
- `public/assets`: 원본의 공개 이미지, 영상 및 폰트
- `lib/seo.ts`: 페이지별 canonical, Open Graph, Twitter 메타데이터
- `app/sitemap.ts`, `app/robots.ts`: 사이트맵과 크롤러 정책
- `app/favicon.ico`, `app/icon.png`, `app/apple-icon.png`: 원본 심볼에서 만든 favicon

## 구현

8개 페이지의 본문을 선택한 언어에 따라 서버에서 생성합니다. 쿠키를 사용하는 동적 렌더링이므로 Next.js 서버 또는 Vercel로 실행해야 합니다. `next/font/local`로 원본 Inter Display의 400/500/700 두께를 자체 호스팅하고, `next/image`로 제품 이미지를 최적화합니다. 모바일 메뉴는 키보드 포커스 제한, Escape 닫기, 배경 스크롤 잠금을 지원합니다. 시스템의 동작 줄이기 설정에서는 등장 효과, 커서 효과, 자동 영상 재생을 줄입니다. JavaScript가 실행되기 전에도 본문은 읽을 수 있습니다.

## EN / JP 언어 전환

상단의 **EN / JP** 버튼으로 영어와 일본어를 전환합니다. 기본 언어는 영어이며, 선택은 `kikae-language` 쿠키에 1년 동안 저장됩니다. 페이지 이동·새로고침·로고의 홈 복귀에도 유지됩니다. 기존 URL을 그대로 사용하므로 언어별 주소는 분리하지 않습니다.

- `lib/translations.ts`: 영어 원문과 일본어 번역. 새 영어 문구를 추가할 때 이 파일에도 번역을 추가합니다.
- `lib/language.ts`, `app/language-action.ts`: 서버에서 언어를 읽고 저장합니다.
- `components/language-switch.tsx`: PC·태블릿·모바일 공통 전환 버튼입니다.
- 일본어 선택 시 본문·메뉴·버튼·접근성 설명·페이지 SEO 메타데이터와 HTML 언어(`ja`)가 함께 바뀝니다.
- 로고, 이미지, 영상에 포함된 글자와 연락처 ID는 원본 그대로 유지합니다. 일본어는 기기의 일본어 시스템 글꼴을 사용합니다.
- `tests/language.test.mjs`: 전체 페이지의 일본어 서버 렌더링, 이미지 유지, 잘못된 언어 값의 영어 복귀, 일본어 404를 확인합니다.

Vercel 미리보기 환경에서는 검색엔진 색인을 차단합니다. 프로덕션에서는 8개 canonical URL을 sitemap에 노출합니다. 원본 이미지를 공유 미리보기 이미지로 재사용하며 별도의 이미지를 생성하지 않았습니다.

## 검증

프로덕션 서버를 실행한 상태에서:

```sh
pnpm typecheck
pnpm test
```

테스트는 8개 페이지의 서버 렌더링·SEO, 잘못된 제품 주소의 404, sitemap, robots, favicon, 영상 범위 요청을 검사합니다. `TEST_BASE_URL`로 다른 서버 주소를 지정할 수 있습니다.

## 원본과의 차이

Framer 내부 편집 데이터의 복제가 아니라 화면과 동작을 참고한 재구현입니다. 공개 사이트를 기준으로 최대한 맞췄지만 모든 프레임의 픽셀 단위 동일함을 보장하지 않습니다. Framer 홍보 배지는 포함하지 않았습니다. 원본의 모바일 서비스명 불일치와 안전 제품 태그 오타는 의미에 맞게 정리했습니다. 문의 이메일은 원본의 표시 주소와 실제 링크가 달라 표시 주소인 `global.kikae@gmail.com`으로 통일했습니다.

최종 검증: 프로덕션 빌드 성공, HTTP/SEO 테스트 11개 통과. 390px·834px·1440px에서 8개 페이지를 확인했으며 가로 넘침이 없었습니다. 모바일 메뉴의 Escape 닫기·포커스 복원·스크롤 잠금 해제를 확인했습니다.

공식 배포 참고: https://vercel.com/docs/frameworks/full-stack/nextjs

## VIEW 페이지의 유튜브 링크 설정

메뉴의 `/Partnership 03` 다음에 `/VIEW 04`가 있으며 `/page`로 이동합니다. `VISIT - WEBSITE`는 홈페이지 첫 화면으로 이동합니다.

`Watch our Story`는 링크가 설정되기 전에는 비활성화 상태와 `COMING SOON` 안내를 표시합니다. 로컬 `.env.local` 또는 Vercel 환경 변수에 `NEXT_PUBLIC_STORY_VIDEO_URL`을 추가하고 실제 YouTube 영상 URL을 값으로 입력한 뒤 재빌드/재배포하면 새 탭으로 영상이 열립니다. 코드 수정은 필요하지 않습니다.

새 페이지도 SEO 메타데이터 및 sitemap에 포함했습니다. VIEW 메뉴의 PC·태블릿·모바일 배치와 홈 링크를 확인했고 HTTP/SEO 검사 12개가 통과했습니다.

## 메인 화면 수정

- 로고: 다른 페이지에서는 홈 문서를 열고, 홈에서 스크롤한 상태에서는 맨 위로 복귀합니다. Next.js의 이전 스크롤 위치 복원과 충돌하지 않도록 처리했습니다.
- PC 메인 문구: 왼쪽 문구는 히어로 높이의 61.5% 위치, 중앙 문구는 하단에서 15% 위치로 조정했습니다.
- `components/interactive-grid.tsx`: 커서 주변 격자선과 교차점이 끌려오고 스프링처럼 복원되는 Canvas 효과입니다. 화면 밖이나 비활성 탭에서는 그리기를 중단하며 터치 및 동작 줄이기 설정을 존중합니다.
- `lib/grid-physics.ts`: 왜곡 범위와 강도를 정의합니다. 격자 테스트 4개를 포함해 전체 테스트 15개가 통과했습니다. 최신 프로덕션 빌드와 로고의 홈 복귀를 브라우저에서 확인했습니다.
