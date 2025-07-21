// js/main.js
import calculate, {
  state,
  appendNumber,
  setOperator,
  appendDecimal,
  backspace,
  clearDisplay,
} from "./index.js";

// 버튼 이벤트 리스너 설정
document.querySelectorAll("[data-value]").forEach((button) => {
  button.addEventListener("click", () => appendNumber(button.dataset.value));
});

document.querySelectorAll("[data-operator]").forEach((button) => {
  button.addEventListener("click", () => setOperator(button.dataset.operator));
});

document.getElementById("btn-equals").addEventListener("click", calculate);
document.getElementById("btn-clear").addEventListener("click", clearDisplay);
document.getElementById("btn-decimal").addEventListener("click", appendDecimal);
document.getElementById("btn-backspace").addEventListener("click", backspace);

// 키보드 입력 지원
document.addEventListener("keydown", (event) => {
  const key = event.key;
  if (/[0-9]/.test(key)) {
    appendNumber(key);
  } else if (["+", "-", "*", "/", "^"].includes(key)) {
    setOperator(key);
  } else if (key === "Enter" || key === "=") {
    event.preventDefault(); // 폼 제출 방지
    calculate();
  } else if (key === "Escape" || key.toLowerCase() === "c") {
    clearDisplay();
  } else if (key === ".") {
    appendDecimal();
  } else if (key === "Backspace") {
    backspace();
  }
});

// 페이지 로드 시 초기화
clearDisplay();
