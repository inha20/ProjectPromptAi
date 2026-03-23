/**
 * PromptEngine.js
 * 구조화된 프롬프트 설계를 위한 엔진 모듈
 */

class PromptEngine {
    constructor() {
        this.baseTemplate = `당신은 {{ persona }}입니다. 
당신의 목표는 아래의 [초안 내용]을 바탕으로, AI 모델이 최상의 결과물을 도출할 수 있도록 구조화되고 정밀한 프롬프트를 재설계하는 것입니다.

[지시 사항]
1. 전문가적 통찰을 담아 구체적으로 작성하세요.
2. 실행 가능한 단계별 가이드를 포함하세요.
3. 결과물의 일관성을 위해 출력 형식을 명확히 정의하세요.
{{ options_cot }}
{{ options_examples }}

[초안 내용]
{{ input_text }}

[출력 형식]
- 필수 구성 요소: 역할 정의, 상황 설정, 상세 작업 목록, 제약 사항, 평가 기준
- 어조: 신뢰감 있고 전문적인 어조`;

        this.personas = {
            developer: "전문적인 시니어 소프트웨어 엔지니어이자 시스템 아키텍트. 클린 코드, 디자인 패턴, 성능 최적화에 능숙하며 기술적 부채를 최소화하는 방향으로 가이드를 제시함.",
            strategist: "10년차 이상의 베테랑 비즈니스 전략 기획자 및 서비스 기획자. 시장 분석, 유저 경험(UX), 비즈니스 모델(BM) 설계에 탁월하며 실무에 즉시 적용 가능한 전략적 조언을 제공함.",
            educator: "교육 공학 전문가이자 학습 컨설턴트. 복잡한 개념을 쉽게 설명하는 데 능하며, 메타 인지를 자극하는 질문과 단계적 학습 경로를 설계함.",
            default: "해당 분야의 최고 전문가이자 컨설턴트."
        };
    }

    /**
     * 프롬프트를 생성합니다.
     * @param {string} inputText 초안 텍스트
     * @param {string} personaKey 페르소나 키 (developer, strategist, educator)
     * @param {object} options 추가 옵션 { includeCot: boolean, includeExamples: boolean }
     * @returns {string} 완성된 프롬프트
     */
    buildPrompt(inputText, personaKey = 'default', options = {}) {
        let persona = this.personas[personaKey] || this.personas.default;
        let prompt = this.baseTemplate;

        // 플레이스홀더 치환
        prompt = prompt.replace('{{ persona }}', persona);
        prompt = prompt.replace('{{ input_text }}', inputText);

        // 옵션 치환
        const cotText = options.includeCot 
            ? "4. 답변 도출 과정을 논리적으로 설명하는 '단계별 사고(Chain-of-Thought)' 방식을 적용하세요." 
            : "";
        const examplesText = options.includeExamples 
            ? "5. 사용자가 참고할 수 있는 고품질 예시를 2개 이상 포함하세요." 
            : "";

        prompt = prompt.replace('{{ options_cot }}', cotText);
        prompt = prompt.replace('{{ options_examples }}', examplesText);

        // 빈 줄 정리
        return prompt.split('\n').filter(line => line.trim() !== '').join('\n');
    }
}

// 브라우저 환경에서 전역 객체로 등록 (ES6 모듈 대신 단순 스크립트로 사용)
window.PromptEngine = PromptEngine;
