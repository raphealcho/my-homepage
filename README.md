# KIKAE — GitHub / Vercel 배포 안내

2026-11-23 기준 최신 가안 소스입니다.
문의 QR 이미지 크기를 기존의 50%로 줄였습니다.
공동대표 이름은 Raphael.C, Marco.K로 표시됩니다.

## GitHub 업로드
1. ZIP을 PC에서 압축 해제합니다.
2. 기존 GitHub 저장소에서 Add file → Upload files를 선택합니다.
3. 압축 해제한 폴더 안의 app, components, lib, public 폴더와 설정 파일들을 올립니다.
   ZIP 파일 자체를 업로드하지 마세요.
4. 저장소 최상위에 package.json이 있도록 올립니다.
   기존 코드가 하위 폴더에 있다면 해당 프로젝트 폴더 안에 덮어씁니다.
5. Commit changes를 누릅니다. GitHub 업로드 화면에서 숨김 파일이 누락되지 않았는지 확인하세요.

연결된 main 브랜치에 업로드하면 운영 사이트가 자동 배포될 수 있습니다.
먼저 검토하려면 별도 브랜치에 올리고 Vercel Preview 배포를 확인한 뒤 main에 병합하세요.
저장소 전체를 삭제할 필요는 없습니다. 동명 파일을 덮어쓰면 됩니다.

## Vercel 설정
- Framework: Next.js
- Node.js: 24.x
- Root Directory: package.json이 있는 폴더
- 설치/빌드 명령: 동봉된 vercel.json 사용
- Output Directory: 기본값

다음 환경 변수를 확인하세요.
NEXT_PUBLIC_SITE_URL=https://www.kikae.co.kr
NEXT_PUBLIC_STORY_VIDEO_URL=https://youtu.be/nl2eny_PaDE?si=UI1OknVUuEHxvFQm

영상 URL이 없으면 Watch our Story는 준비 중으로 표시됩니다.
환경 변수를 저장하거나 변경했다면 새로 배포해야 적용됩니다.
임시 Cloudflare 주소나 localhost 주소를 운영 SITE_URL로 넣지 마세요.
.env.example은 참고용이며 자동으로 적용되지 않습니다.

## 로컬 실행
Node.js 24.x 설치 후:
npx --yes pnpm@11.25.0 install --frozen-lockfile
npx --yes pnpm@11.25.0 dev

## 배포 빌드
npx --yes pnpm@11.25.0 build

## 주요 편집 위치
- components/showcase-home.tsx: 메인
- app/products/page.tsx: 제품
- components/marketing-accordion.tsx: 마케팅 서비스 시안
- app/brands/page.tsx: 브랜드
- app/partnership/page.tsx: 파트너십
- app/contact/page.tsx: 문의 및 이름
- lib/showcase.ts: 브랜드와 누적 판매량
- lib/translations.ts: 번역
- app/globals.css, app/showcase.css: 디자인

node_modules, .next, .env.local, Git 기록, 임시 터널 도구는 제외했습니다.
SEO, favicon, 이미지, 영상, 잠금 파일은 포함되어 있습니다.
