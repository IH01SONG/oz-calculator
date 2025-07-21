// js/history.js

/**
 * 계산 기록 배열에 새로운 기록을 추가합니다.
 * @param {Array} historyArray - 전체 기록 배열
 * @param {object} record - 추가할 기록 객체
 */
function saveHistory(historyArray, record) {
  historyArray.push(record);
  console.log("계산 기록:", JSON.stringify(historyArray, null, 2));
}

/**
 * 계산 기록을 화면에 표시합니다.
 * @param {Array} history - 표시할 기록 배열
 */
export const updateHistoryDisplay = (history) => {
  const historyList = document.getElementById("history-list");
  if (historyList) {
    historyList.innerHTML = ""; // 기존 기록 초기화
    history.forEach((record) => {
      const p = document.createElement("p");
      p.textContent = `${record.firstNumber} ${record.operator} ${record.secondNumber} = ${record.result}`;
      historyList.appendChild(p);
    });
  }
};

export default saveHistory;
