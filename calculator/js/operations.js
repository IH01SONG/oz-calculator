// js/operations.js

/**
 * 두 숫자와 연산자를 받아 계산 결과를 반환합니다.
 * @param {string} operator - 연산자 (+, -, *, /)
 * @param {number} firstNumber - 첫 번째 숫자
 * @param {number} secondNumber - 두 번째 숫자
 * @returns {number} 계산 결과
 */
function calculateOperation(operator, firstNumber, secondNumber) {
  // 6. 나눗셈에서 secondNumber가 0인지 확인
  if (operator === "/" && secondNumber === 0) {
    throw new Error("0으로 나눌 수 없습니다.");
  }

  // 7. operator에 따라 사칙연산 수행 (switch 문 사용)
  switch (operator) {
    case "+":
      return firstNumber + secondNumber;
    case "-":
      return firstNumber - secondNumber;
    case "*":
      return firstNumber * secondNumber;
    case "/":
      return firstNumber / secondNumber;
    case "^":
      return firstNumber ^ secondNumber; // 제곱연산 추가
    default:
      throw new Error("알 수 없는 연산자입니다.");
  }
}

export default calculateOperation;
