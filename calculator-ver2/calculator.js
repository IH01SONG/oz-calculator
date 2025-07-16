let history = []; // 계산 기록을 저장하는 배열
let currentInput = ""; // 현재 입력값
let firstNumber = null; // 첫 번째 숫자
let operator = null; // 선택된 연산자
const operators = ["+", "-", "*", "/"]; // 유효한 연산자 정의
let isResultDisplayed = false; // 결과가 화면에 표시 중인지 여부

// 숫자 버튼 클릭 시 디스플레이에 숫자 추가
const appendNumber = (number) => {
  try {
    // TODO: 학생들이 작성해야 할 로직
    // 1. number가 유효한 숫자인지 확인 (예: 문자열 "0" ~ "9")
    if (!/^[0-9]$/.test(number)) throw new Error("유효한 숫자를 입력하세요.");

    if (isResultDisplayed) {
      // 결과가 표시된 후 새로운 숫자 입력 시 초기화
      currentInput = "";
      firstNumber = null; // 결과 표시 후 숫자 입력 시 firstNumber도 초기화
      operator = null; // 결과 표시 후 숫자 입력 시 operator도 초기화
      isResultDisplayed = false;
    }

    // currentInput에 숫자 추가
    currentInput += number;

    // 디스플레이 업데이트
    const display = document.getElementById("display");
    if (!display) throw new Error("디스플레이 요소를 찾을 수 없습니다.");

    // 연산자가 선택된 상태라면 'firstNumber operator currentInput' 형식으로 표시
    // 그렇지 않다면 currentInput만 표시
    if (firstNumber !== null && operator !== null) {
      display.textContent = `${firstNumber} ${operator} ${currentInput}`;
    } else {
      display.textContent = currentInput;
    }
  } catch (error) {
    showError(error.message);
  }
};

// 연산자 버튼 클릭 시 연산자 설정
const setOperator = (op) => {
  try {
    // TODO: 학생들이 작성해야 할 로직
    // 2. op가 유효한 연산자(+, -, *, /)인지 확인
    if (!operators.includes(op)) throw new Error("유효한 연산자를 선택하세요.");

    // 현재 입력값이 없으면 예외 처리
    if (!currentInput && firstNumber === null)
      throw new Error("숫자를 먼저 입력하세요.");

    if (currentInput && firstNumber === null) {
      firstNumber = Number(currentInput);
    } else if (currentInput && firstNumber !== null && operator !== null) {
      // 연속적인 연산자 입력 시 이전 계산 수행
      calculate();
      // calculate() 호출 후 firstNumber가 업데이트되므로, 그 값을 사용
      firstNumber = Number(document.getElementById("display").textContent); // 계산된 결과를 firstNumber로 설정
    }

    // TODO: 학생들이 작성해야 할 로직
    // 3. firstNumber가 유효한 숫자인지 확인
    if (isNaN(firstNumber)) throw new Error("유효한 숫자를 입력하세요.");

    operator = op;
    currentInput = ""; // 입력값 초기화
    document.getElementById(
      "display"
    ).textContent = `${firstNumber} ${operator}`;
    isResultDisplayed = false;
  } catch (error) {
    showError(error.message);
  }
};

// 초기화 버튼 클릭 시 모든 값 초기화 (AC)
const clearDisplay = () => {
  currentInput = "";
  firstNumber = null;
  operator = null;
  document.getElementById("display").textContent = "0";
  document.getElementById("result").classList.add("d-none");
  document.getElementById("history").innerHTML = ""; // 기록 초기화
  isResultDisplayed = false;
};

// 부호 변경 (+/-)
const toggleSign = () => {
  try {
    if (isResultDisplayed) {
      currentInput = (
        parseFloat(document.getElementById("display").textContent) * -1
      ).toString();
      document.getElementById("display").textContent = currentInput;
      firstNumber = parseFloat(currentInput);
      isResultDisplayed = false;
    } else if (currentInput !== "") {
      currentInput = (parseFloat(currentInput) * -1).toString();
      document.getElementById("display").textContent = currentInput;
    } else if (firstNumber !== null) {
      firstNumber = firstNumber * -1;
      document.getElementById("display").textContent = `${firstNumber} ${
        operator || ""
      }`;
    }
  } catch (error) {
    showError(error.message);
  }
};

// 퍼센트 계산 (%)
const calculatePercentage = () => {
  try {
    if (currentInput !== "") {
      currentInput = (parseFloat(currentInput) / 100).toString();
      document.getElementById("display").textContent = currentInput;
    } else if (firstNumber !== null) {
      firstNumber = firstNumber / 100;
      document.getElementById("display").textContent = `${firstNumber} ${
        operator || ""
      }`;
    }
  } catch (error) {
    showError(error.message);
  }
};

// 계산 실행
const calculate = () => {
  const resultElement = document.getElementById("result");
  let result; // var 키워드 사용 예시
  try {
    // TODO: 학생들이 작성해야 할 로직
    // 4. firstNumber, operator, currentInput(두 번째 숫자)이 모두 존재하는지 확인
    if (firstNumber === null || operator === null) {
      // 연산자 없이 =을 누른 경우 현재 입력값을 결과로 표시
      if (currentInput !== "") {
        result = parseFloat(currentInput);
        document.getElementById("display").textContent = result;
        isResultDisplayed = true;
        return;
      }
      throw new Error("계산에 필요한 값이 부족합니다.");
    }

    // currentInput이 비어있으면 firstNumber를 두 번째 숫자로 사용 (예: 5 + = )
    const secondNumber =
      currentInput === "" ? firstNumber : Number(currentInput);

    // TODO: 학생들이 작성해야 할 로직
    // 5. secondNumber가 유효한 숫자인지 확인
    if (isNaN(secondNumber)) throw new Error("유효한 숫자를 입력하세요.");
    // 6. 나눗셈에서 secondNumber가 0인지 확인
    if (operator === "/" && secondNumber === 0)
      throw new Error("0으로 나눌 수 없습니다.");

    // TODO: 학생들이 작성해야 할 로직
    // 7. operator에 따라 사칙연산 수행 (switch 문 사용 권장)
    switch (operator) {
      case "+":
        result = firstNumber + secondNumber;
        break;
      case "-":
        result = firstNumber - secondNumber;
        break;
      case "*":
        result = firstNumber * secondNumber;
        break;
      case "/":
        result = firstNumber / secondNumber;
        break;
      default:
        throw new Error("알 수 없는 연산자입니다.");
    }

    // 결과 출력
    resultElement.classList.remove("d-none", "alert-danger");
    resultElement.classList.add("alert-info");
    resultElement.textContent = `결과: ${result}`;

    // 계산 기록 저장
    const record = { firstNumber, operator, secondNumber, result };
    history.push(record);
    console.log("계산 기록:", JSON.stringify(history, null, 2));

    // 계산 기록 디스플레이 업데이트
    updateHistoryDisplay();

    // 계산 후 초기화
    currentInput = result.toString();
    firstNumber = result; // 계산된 결과를 다음 계산의 첫 번째 숫자로 사용
    operator = null;
    document.getElementById("display").textContent = result;
    isResultDisplayed = true;
  } catch (error) {
    showError(error.message);
  }
};

// 에러 메시지 출력
const showError = (message) => {
  const resultElement = document.getElementById("result");
  resultElement.classList.remove("d-none", "alert-info");
  resultElement.classList.add("alert-danger");
  resultElement.textContent = `에러: ${message}`;
};

// 기록 디스플레이 업데이트
const updateHistoryDisplay = () => {
  const historyElement = document.getElementById("history");
  if (!historyElement) return;

  historyElement.innerHTML = ""; // 기존 기록 초기화
  for (let i = 0; i < history.length; i++) {
    // for loop 사용 예시
    const record = history[i];
    const p = document.createElement("p");
    p.textContent = `${record.firstNumber} ${record.operator} ${record.secondNumber} = ${record.result}`;
    historyElement.appendChild(p);
  }
};

// 추가 기능: 소수점 추가
const appendDecimal = () => {
  try {
    if (isResultDisplayed) {
      // 결과가 표시된 후 소수점 입력 시 초기화
      currentInput = "";
      firstNumber = null;
      operator = null;
      isResultDisplayed = false;
    }

    if (!currentInput.includes(".")) {
      currentInput += ".";
      document.getElementById("display").textContent =
        firstNumber !== null && operator !== null
          ? `${firstNumber} ${operator} ${currentInput}`
          : currentInput;
    }
  } catch (error) {
    showError(error.message);
  }
};

// 추가 기능: 백스페이스 (마지막 문자 삭제)
// 이 기능은 이미지에 없으므로, 필요하다면 다시 추가할 수 있습니다.
// 현재는 AC, +/-, % 버튼으로 대체됩니다.

const backspace = () => {
  try {
    if (isResultDisplayed) {
      // 결과가 표시된 후 백스페이스 시 초기화
      currentInput = "";
      isResultDisplayed = false;
      document.getElementById("display").textContent = "0";
      return;
    }

    currentInput = currentInput.slice(0, -1);
    if (currentInput === "") {
      document.getElementById("display").textContent =
        firstNumber !== null && operator !== null
          ? `${firstNumber} ${operator} 0`
          : "0";
    } else {
      document.getElementById("display").textContent =
        firstNumber !== null && operator !== null
          ? `${firstNumber} ${operator} ${currentInput}`
          : currentInput;
    }
  } catch (error) {
    showError(error.message);
  }
};

// 추가 기능: 키보드 입력 지원
document.addEventListener("keydown", (event) => {
  const key = event.key;
  if (/[0-9]/.test(key)) {
    appendNumber(key);
  } else if (key === "+") {
    setOperator("+");
  } else if (key === "-") {
    setOperator("-");
  } else if (key === "*") {
    setOperator("*");
  } else if (key === "/") {
    setOperator("/");
  } else if (key === "Enter") {
    calculate();
  } else if (key === "Escape") {
    clearDisplay();
  } else if (key === ".") {
    appendDecimal();
  } else if (key === "Backspace") {
    // backspace(); // 현재는 이 기능이 UI에 없으므로 주석 처리
  }
});
