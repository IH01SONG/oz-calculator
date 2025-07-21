// js/index.js
import calculateOperation from "./operations.js";
import { setDisplay, resetDisplay } from "./input.js";
import { showError, removeError } from "./error.js";
import saveHistory, { updateHistoryDisplay } from "./history.js";

// 상태 변수
export let state = {
  currentInput: "",
  firstNumber: null,
  operator: null,
  isResultDisplayed: false,
  history: [],
};

const operators = ["+", "-", "*", "/"];

// 디스플레이 업데이트 로직
function updateDisplay() {
  if (state.operator && state.firstNumber !== null) {
    setDisplay(`${state.firstNumber} ${state.operator} ${state.currentInput}`);
  } else {
    setDisplay(state.currentInput || "0");
  }
}

// 숫자 입력 처리
export function appendNumber(number) {
  removeError();
  if (state.isResultDisplayed) {
    state.currentInput = "";
    state.isResultDisplayed = false;
  }
  if (!/^[0-9]$/.test(number)) {
    showError("유효한 숫자를 입력하세요.");
    return;
  }
  state.currentInput += number;
  updateDisplay();
}

// 연산자 설정 처리
export function setOperator(op) {
  removeError();
  if (!operators.includes(op)) {
    showError("유효한 연산자를 선택하세요.");
    return;
  }
  if (state.currentInput === "" && state.firstNumber === null) {
    showError("숫자를 먼저 입력하세요.");
    return;
  }
  if (state.currentInput !== "") {
    if (state.firstNumber !== null) {
      calculate();
    }
    state.firstNumber = Number(state.currentInput);
    state.currentInput = "";
  }
  state.operator = op;
  state.isResultDisplayed = false;
  updateDisplay();
}

// 소수점 처리
export function appendDecimal() {
  removeError();
  if (state.isResultDisplayed) {
    state.currentInput = "";
    state.isResultDisplayed = false;
  }
  if (!state.currentInput.includes(".")) {
    state.currentInput += ".";
  }
  updateDisplay();
}

// 백스페이스 처리
export function backspace() {
  removeError();
  if (state.isResultDisplayed) return;
  if (state.currentInput.length > 0) {
    state.currentInput = state.currentInput.slice(0, -1);
  }
  updateDisplay();
}

// 화면 초기화
export function clearDisplay() {
  state.currentInput = "";
  state.firstNumber = null;
  state.operator = null;
  state.isResultDisplayed = false;
  state.history = [];
  resetDisplay();
  removeError();
  updateHistoryDisplay(state.history);
}

// 계산 로직 (default export)
function calculate() {
  try {
    if (
      state.firstNumber === null ||
      state.operator === null ||
      state.currentInput === ""
    ) {
      throw new Error("계산에 필요한 값이 부족합니다.");
    }
    const secondNumber = Number(state.currentInput);
    if (isNaN(state.firstNumber) || isNaN(secondNumber)) {
      throw new Error("유효한 숫자로 계산해야 합니다.");
    }

    const result = calculateOperation(
      state.operator,
      state.firstNumber,
      secondNumber
    );

    setDisplay(result);
    document
      .getElementById("result")
      .classList.remove("d-none", "alert-danger");
    document.getElementById("result").classList.add("alert-info");
    document.getElementById("result").textContent = `결과: ${result}`;

    const record = {
      firstNumber: state.firstNumber,
      operator: state.operator,
      secondNumber,
      result,
    };
    saveHistory(state.history, record);
    updateHistoryDisplay(state.history);

    state.currentInput = result.toString();
    state.firstNumber = result;
    state.operator = null;
    state.isResultDisplayed = true;
  } catch (error) {
    showError(error.message);
    state.isResultDisplayed = true; // 에러 발생 시 추가 입력 방지
  }
}

export default calculate;
