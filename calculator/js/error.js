// js/error.js

const resultElement = document.getElementById("result");

// 에러 메시지 출력
export const showError = (message) => {
  if (resultElement) {
    resultElement.classList.remove("d-none", "alert-info");
    resultElement.classList.add("alert-danger");
    resultElement.textContent = `에러: ${message}`;
  }
};

// 에러 및 결과 메시지창 숨기기
export const removeError = () => {
  if (resultElement) {
    resultElement.classList.add("d-none");
  }
};
