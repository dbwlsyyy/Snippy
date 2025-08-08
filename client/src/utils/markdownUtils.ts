// src/utils/markdownUtils.ts
// Markdown 텍스트에서 주요 마크다운 문법을 제거하여 일반 텍스트로 변환하는 함수
export function stripMarkdown(markdownText: string): string {
    let plainText = markdownText;

    // 1. 헤더 (##, ### 등) 제거
    plainText = plainText.replace(/^#+\s/gm, '');

    // 2. 굵게, 기울임꼴 (**abc**, *abc*, __abc__, _abc_ 등) 제거 (내용은 유지)
    plainText = plainText.replace(/(\*\*|__)(.*?)\1/g, '$2');
    plainText = plainText.replace(/(\*|_)(.*?)\1/g, '$2');

    // 3. 링크 ([text](url)) 제거 (링크 텍스트는 유지)
    plainText = plainText.replace(/\[(.*?)\]\(.*?\)/g, '$1');

    // 4. 이미지 (![alt](url)) 제거
    plainText = plainText.replace(/!\[.*?\]\(.*?\)/g, '');

    // 5. 인라인 코드 (`code`) 제거
    plainText = plainText.replace(/`/g, '');

    // 6. 리스트 마커 (-, *, +, 숫자.) 제거
    plainText = plainText.replace(/^\s*[-*+]\s/gm, ''); // 순서 없는 리스트
    plainText = plainText.replace(/^\s*\d+\.\s/gm, ''); // 순서 있는 리스트

    // 7. 구분선 (---, ***, ___) 제거
    plainText = plainText.replace(/^(---|\*\*\*|___)\s*$/gm, '');

    // 8. 불필요한 공백/줄바꿈 정리 (순서 변경됨)
    plainText = plainText.replace(/[\r\n]+/g, ' '); // 여러 줄바꿈을 공백 하나로
    plainText = plainText.replace(/\s+/g, ' '); // 여러 공백을 공백 하나로

    return plainText.trim(); // 앞뒤 공백 제거
}
