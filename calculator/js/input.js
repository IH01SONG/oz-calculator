// js/input.js

// 디스플레이 텍스트 설정
export const setDisplay = (text) => {
  const display = document.getElementById("display");
  if (display) {
    display.textContent = text;
  }
};

// 디스플레이 초기화
export const resetDisplay = () => {
  setDisplay("0");
};

// 디스플레이에서 마지막 문자 삭제
export const subDisplay = () => {
  const display = document.getElementById("display");
  if (display.textContent.length > 1) {
    display.textContent = display.textContent.slice(0, -1);
  } else {
    display.textContent = "0";
  }
};
