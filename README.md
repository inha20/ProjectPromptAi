# ✨ Prompt Enhancer (AI 프롬프트 메이커)

> 사용자의 초안 아이디어를 전문적인 **구조화된 프롬프트**로 변환하고, 즉시 테스트할 수 있는 AI 프롬프트 엔지니어링 도구입니다.

![App Preview](https://via.placeholder.com/1200x600/0d1117/e6edf3?text=Prompt+Enhancer+v2.0+UI+Preview)

## 🌟 주요 특징

- **구조화된 프롬프트 엔진**: Role, Context, Task, Constraints, Output Format을 체계적으로 조합합니다.
- **전문가 페르소나 선택**: 개발자, 전략 기획자, 교육 전문가 등 목적에 맞는 페르소나를 즉시 적용합니다.
- **품질 제어 옵션**: 단계별 사고(Chain-of-Thought) 유도 및 구체적 예시 포함 옵션을 통해 결과의 일관성을 높입니다.
- **듀얼 패널 인터페이스**: 왼쪽의 AI 채팅 시뮬레이터와 오른쪽의 프롬프트 제작소가 유기적으로 연결됩니다.
- **Zero-Dependency**: 외부 라이브러리 없이 Vanilla JS로 구현되어 가볍고 빠릅니다.

## 🏗️ 시스템 아키텍처

```
사용자 입력 (초안) + 옵션 선택 (Persona, CoT 등)
                │
                ▼
┌──────────────────────────────────────────┐
│             PromptEngine.js              │
│  (Template + Persona + Options 조합)     │
└────────────────┬─────────────────────────┘
                │
                ▼
      구조화된 프롬프트 생성 (Output)
                │
        ┌───────┴───────┐
        │               │
  클립보드 복사    AI 채팅 시뮬레이션
```

## 🚀 시작하기

### 방법 1: 원클릭 설치 및 실행 (Windows 추천)

1. `install.bat` 더블클릭 (설치 환경 확인)
2. `run.bat` 더블클릭 (로컬 서버 실행 및 브라우저 열기)

### 방법 2: 직접 실행

1. `index.html` 파일을 브라우저에서 직접 엽니다.

## 📂 파일 구조

- `index.html`: 메인 웹 인터페이스
- `style.css`: 테마 및 레이아웃 스타일 (Glassmorphism 적용)
- `script.js`: UI 로직 및 이벤트 핸들링
- `PromptEngine.js`: 프롬프트 생성 핵심 엔진
- `prompts/`: 페르소나 및 기본 템플릿 저장소 (확장 가능)
- `install.bat` / `run.bat`: 실행 편의 스크립트
- `MANUAL.md`: 상세 사용 가이드 및 면접 대비 자료

---
Designed for professional Prompt Engineering portfolios.
