# 본초학 연못 퀴즈 사이트

업로드한 본초학 시험 범위 자료를 기준으로 만든 GitHub Pages용 정적 학습 사이트입니다.

## 구성
- `index.html` 메인
- `toc.html` 목차 및 공부 범위 선택
- `memorize.html` 분류 카드 + 글자 가리기 암기
- `color-quiz.html` 소목차 시그니처 색 기반 보석십자수형 색칠퀴즈
- `recall.html` 소목차 자유회상 시험
- `review.html` 색칠퀴즈/회상시험 오답 재시험
- `records.html` 숙련도와 오답 기록

## 디자인
전체를 연녹색 연못 테마로 통일했습니다. 연꽃, 연잎, 눈 없는 금붕어 오브제를 로컬 SVG 자산으로 사용하므로 외부 이미지 서버가 필요하지 않습니다.

## 기록 저장
진행도, 출제 범위, 오답 기록은 브라우저 `localStorage`에 저장됩니다. 별도 서버나 데이터베이스가 없어도 GitHub Pages에서 작동합니다.

## GitHub Pages 배포
1. 새 GitHub 저장소를 만듭니다.
2. 이 폴더 안의 파일과 `assets` 폴더를 저장소 루트에 모두 업로드합니다.
3. GitHub 저장소의 **Settings → Pages**로 이동합니다.
4. **Deploy from a branch**를 선택하고 `main` / `/ (root)`를 지정합니다.
5. 잠시 뒤 생성된 Pages 주소로 접속합니다.
