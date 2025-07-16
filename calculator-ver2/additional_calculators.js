// 1. 환율 계산기 및 세계 시간 변환기
const convertCurrency = async () => {
  const amount = parseFloat(document.getElementById("amount").value);
  const currency = document.getElementById("currency").value;
  const exchangeResult = document.getElementById("exchangeResult");

  if (isNaN(amount) || amount <= 0) {
    exchangeResult.classList.remove("alert-info");
    exchangeResult.classList.add("alert-danger");
    exchangeResult.textContent = "유효한 금액을 입력하세요.";
    exchangeResult.classList.remove("d-none");
    return;
  }

  // 실제 환율 API 연동 (예: ExchangeRate-API, Open Exchange Rates 등)
  // 여기서는 예시 값으로 고정된 환율을 사용합니다.
  const exchangeRates = {
    USD: 1350, // 1 USD = 1350 KRW (예시)
    EUR: 1450, // 1 EUR = 1450 KRW (예시)
    JPY: 9, // 1 JPY = 9 KRW (예시, 100 JPY당 계산 시 100으로 나눔)
  };

  let convertedAmount;
  if (currency === "JPY") {
    convertedAmount = (amount / exchangeRates[currency]) * 100; // 100엔당 가격일 경우
  } else {
    convertedAmount = amount / exchangeRates[currency];
  }

  if (exchangeRates[currency]) {
    exchangeResult.classList.remove("alert-danger");
    exchangeResult.classList.add("alert-info");
    exchangeResult.textContent = `변환된 금액: ${convertedAmount.toFixed(
      2
    )} ${currency}`;
  } else {
    exchangeResult.classList.remove("alert-info");
    exchangeResult.classList.add("alert-danger");
    exchangeResult.textContent =
      "선택된 통화에 대한 환율 정보를 찾을 수 없습니다.";
  }
  exchangeResult.classList.remove("d-none");
};

const convertTime = () => {
  const koreaTimeInput = document.getElementById("koreaTime").value;
  const targetTimeZone = document.getElementById("targetTimeZone").value;
  const timeConvertResult = document.getElementById("timeConvertResult");

  if (!koreaTimeInput) {
    timeConvertResult.classList.remove("alert-info");
    timeConvertResult.classList.add("alert-danger");
    timeConvertResult.textContent = "한국 시간을 입력하세요.";
    timeConvertResult.classList.remove("d-none");
    return;
  }

  try {
    const koreaDate = new Date(koreaTimeInput);
    const options = {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
      timeZone: targetTimeZone,
    };
    const targetTime = new Intl.DateTimeFormat("ko-KR", options).format(
      koreaDate
    );

    timeConvertResult.classList.remove("alert-danger");
    timeConvertResult.classList.add("alert-info");
    timeConvertResult.textContent = `변환된 시간 (${
      targetTimeZone.split("/")[1] || targetTimeZone
    }): ${targetTime}`;
  } catch (error) {
    timeConvertResult.classList.remove("alert-info");
    timeConvertResult.classList.add("alert-danger");
    timeConvertResult.textContent =
      "시간 변환 중 오류가 발생했습니다. 유효한 시간을 입력하세요.";
  }
  timeConvertResult.classList.remove("d-none");
};

// 2. 연봉 실수령액 계산기
const calculateNetSalary = () => {
  const annualSalary = parseFloat(
    document.getElementById("annualSalary").value
  );
  const netSalaryResult = document.getElementById("netSalaryResult");

  if (isNaN(annualSalary) || annualSalary <= 0) {
    netSalaryResult.classList.remove("alert-info");
    netSalaryResult.classList.add("alert-danger");
    netSalaryResult.textContent = "유효한 연봉을 입력하세요.";
    netSalaryResult.classList.remove("d-none");
    return;
  }

  // 간단한 세금 및 4대 보험 공제율 (예시, 실제와 다를 수 있음)
  const incomeTaxRate = 0.03; // 소득세 (간이세액표 기준)
  const localTaxRate = 0.003; // 지방소득세 (소득세의 10%)
  const nationalPensionRate = 0.045; // 국민연금 (회사와 반반)
  const healthInsuranceRate = 0.03545; // 건강보험 (회사와 반반)
  const longTermCareRate = 0.1295; // 장기요양보험 (건강보험료의 12.95%)
  const employmentInsuranceRate = 0.009; // 고용보험

  const monthlySalary = annualSalary / 12;

  const nationalPension = monthlySalary * nationalPensionRate;
  const healthInsurance = monthlySalary * healthInsuranceRate;
  const longTermCare = healthInsurance * longTermCareRate;
  const employmentInsurance = monthlySalary * employmentInsuranceRate;

  // 소득세는 연봉 구간별로 다르지만, 여기서는 간단한 비율 적용
  const incomeTax = monthlySalary * incomeTaxRate;
  const localTax = incomeTax * localTaxRate;

  const totalDeductions =
    nationalPension +
    healthInsurance +
    longTermCare +
    employmentInsurance +
    incomeTax +
    localTax;
  const netMonthlySalary = monthlySalary - totalDeductions;
  const netAnnualSalary = netMonthlySalary * 12;

  netSalaryResult.classList.remove("alert-danger");
  netSalaryResult.classList.add("alert-info");
  netSalaryResult.innerHTML = `
        <p>월 실수령액: ${netMonthlySalary.toLocaleString("ko-KR", {
          style: "currency",
          currency: "KRW",
        })}</p>
        <p>연 실수령액: ${netAnnualSalary.toLocaleString("ko-KR", {
          style: "currency",
          currency: "KRW",
        })}</p>
        <hr>
        <p>공제 내역 (월 기준):</p>
        <ul>
            <li>국민연금: ${nationalPension.toLocaleString("ko-KR", {
              style: "currency",
              currency: "KRW",
            })}</li>
            <li>건강보험: ${healthInsurance.toLocaleString("ko-KR", {
              style: "currency",
              currency: "KRW",
            })}</li>
            <li>장기요양보험: ${longTermCare.toLocaleString("ko-KR", {
              style: "currency",
              currency: "KRW",
            })}</li>
            <li>고용보험: ${employmentInsurance.toLocaleString("ko-KR", {
              style: "currency",
              currency: "KRW",
            })}</li>
            <li>소득세: ${incomeTax.toLocaleString("ko-KR", {
              style: "currency",
              currency: "KRW",
            })}</li>
            <li>지방소득세: ${localTax.toLocaleString("ko-KR", {
              style: "currency",
              currency: "KRW",
            })}</li>
        </ul>
    `;
  netSalaryResult.classList.remove("d-none");
};

// 3. 대출 이자 계산기 / 상환 계획 시뮬레이터
const calculateLoanInterest = () => {
  const loanAmount = parseFloat(document.getElementById("loanAmount").value);
  const loanInterestRate = parseFloat(
    document.getElementById("loanInterestRate").value
  );
  const loanTerm = parseInt(document.getElementById("loanTerm").value);
  const loanResult = document.getElementById("loanResult");

  if (
    isNaN(loanAmount) ||
    loanAmount <= 0 ||
    isNaN(loanInterestRate) ||
    loanInterestRate < 0 ||
    isNaN(loanTerm) ||
    loanTerm <= 0
  ) {
    loanResult.classList.remove("alert-info");
    loanResult.classList.add("alert-danger");
    loanResult.textContent = "유효한 대출 정보를 입력하세요.";
    loanResult.classList.remove("d-none");
    return;
  }

  const monthlyInterestRate = loanInterestRate / 100 / 12;
  let monthlyPayment;
  let totalInterest = 0;

  if (monthlyInterestRate === 0) {
    // 이자율이 0%인 경우
    monthlyPayment = loanAmount / loanTerm;
    totalInterest = 0;
  } else {
    // 원리금 균등 상환 방식 계산
    monthlyPayment =
      (loanAmount *
        monthlyInterestRate *
        Math.pow(1 + monthlyInterestRate, loanTerm)) /
      (Math.pow(1 + monthlyInterestRate, loanTerm) - 1);
    totalInterest = monthlyPayment * loanTerm - loanAmount;
  }

  loanResult.classList.remove("alert-danger");
  loanResult.classList.add("alert-info");
  loanResult.innerHTML = `
        <p>월 상환액 (원리금 균등): ${monthlyPayment.toLocaleString("ko-KR", {
          style: "currency",
          currency: "KRW",
        })}</p>
        <p>총 이자액: ${totalInterest.toLocaleString("ko-KR", {
          style: "currency",
          currency: "KRW",
        })}</p>
        <p>총 상환액: ${(loanAmount + totalInterest).toLocaleString("ko-KR", {
          style: "currency",
          currency: "KRW",
        })}</p>
    `;
  loanResult.classList.remove("d-none");
};

// 4. BMI (체질량 지수) 계산기 및 건강 목표 설정 도우미
const calculateBMI = () => {
  const heightCm = parseFloat(document.getElementById("heightCm").value);
  const weightKg = parseFloat(document.getElementById("weightKg").value);
  const bmiResult = document.getElementById("bmiResult");

  if (isNaN(heightCm) || heightCm <= 0 || isNaN(weightKg) || weightKg <= 0) {
    bmiResult.classList.remove("alert-info");
    bmiResult.classList.add("alert-danger");
    bmiResult.textContent = "유효한 키와 몸무게를 입력하세요.";
    bmiResult.classList.remove("d-none");
    return;
  }

  const heightM = heightCm / 100;
  const bmi = weightKg / (heightM * heightM);

  let bmiCategory = "";
  if (bmi < 18.5) {
    bmiCategory = "저체중";
  } else if (bmi >= 18.5 && bmi < 23) {
    bmiCategory = "정상";
  } else if (bmi >= 23 && bmi < 25) {
    bmiCategory = "과체중";
  } else if (bmi >= 25 && bmi < 30) {
    bmiCategory = "비만";
  } else {
    bmiCategory = "고도 비만";
  }

  bmiResult.classList.remove("alert-danger");
  bmiResult.classList.add("alert-info");
  bmiResult.innerHTML = `
        <p>BMI: ${bmi.toFixed(2)}</p>
        <p>분류: ${bmiCategory}</p>
        <p>권장 BMI 범위: 18.5 - 22.9</p>
    `;
  bmiResult.classList.remove("d-none");
};

// 5. 아파트 관리비 계산 및 비교 도구
const calculateAptManagementFee = () => {
  const mngArea = parseFloat(document.getElementById("mngArea").value);
  const commonMngFee = parseFloat(
    document.getElementById("commonMngFee").value
  );
  const repairFee = parseFloat(document.getElementById("repairFee").value);
  const aptMngResult = document.getElementById("aptMngResult");

  if (
    isNaN(mngArea) ||
    mngArea <= 0 ||
    isNaN(commonMngFee) ||
    commonMngFee < 0 ||
    isNaN(repairFee) ||
    repairFee < 0
  ) {
    aptMngResult.classList.remove("alert-info");
    aptMngResult.classList.add("alert-danger");
    aptMngResult.textContent = "유효한 관리비 정보를 입력하세요.";
    aptMngResult.classList.remove("d-none");
    return;
  }

  const totalCommonMngFee = mngArea * commonMngFee;
  const totalRepairFee = mngArea * repairFee;
  const totalManagementFee = totalCommonMngFee + totalRepairFee;

  aptMngResult.classList.remove("alert-danger");
  aptMngResult.classList.add("alert-info");
  aptMngResult.innerHTML = `
        <p>총 일반 관리비: ${totalCommonMngFee.toLocaleString("ko-KR", {
          style: "currency",
          currency: "KRW",
        })}</p>
        <p>총 장기수선충당금: ${totalRepairFee.toLocaleString("ko-KR", {
          style: "currency",
          currency: "KRW",
        })}</p>
        <p>총 예상 관리비: ${totalManagementFee.toLocaleString("ko-KR", {
          style: "currency",
          currency: "KRW",
        })}</p>
    `;
  aptMngResult.classList.remove("d-none");
};

// 현재 한국 시간 자동 설정 (페이지 로드 시)
document.addEventListener("DOMContentLoaded", () => {
  const koreaTimeInput = document.getElementById("koreaTime");
  if (koreaTimeInput) {
    const now = new Date();
    const year = now.getFullYear();
    const month = (now.getMonth() + 1).toString().padStart(2, "0");
    const day = now.getDate().toString().padStart(2, "0");
    const hours = now.getHours().toString().padStart(2, "0");
    const minutes = now.getMinutes().toString().padStart(2, "0");
    koreaTimeInput.value = `${year}-${month}-${day}T${hours}:${minutes}`;
  }
});

// 사용자 의견 보내기 기능
const sendFeedback = (recipientEmail) => {
  const email = document.getElementById("feedbackEmail").value;
  const subject = document.getElementById("feedbackSubject").value;
  const message = document.getElementById("feedbackMessage").value;
  const feedbackStatus = document.getElementById("feedbackStatus");

  if (!email || !subject || !message) {
    feedbackStatus.classList.remove("alert-info", "alert-success");
    feedbackStatus.classList.add("alert-danger");
    feedbackStatus.textContent = "모든 필드를 채워주세요.";
    feedbackStatus.classList.remove("d-none");
    return;
  }

  // 이메일 유효성 검사 (간단한 패턴)
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    feedbackStatus.classList.remove("alert-info", "alert-success");
    feedbackStatus.classList.add("alert-danger");
    feedbackStatus.textContent = "유효한 이메일 주소를 입력하세요.";
    feedbackStatus.classList.remove("d-none");
    return;
  }

  // mailto 링크 생성
  const mailtoLink = `mailto:${recipientEmail}?subject=${encodeURIComponent(
    subject
  )}&body=${encodeURIComponent(`보낸 사람: ${email}\n\n${message}`)}`;

  // 새 창에서 mailto 링크 열기
  window.open(mailtoLink, "_blank");

  feedbackStatus.classList.remove("alert-danger");
  feedbackStatus.classList.add("alert-success");
  feedbackStatus.textContent =
    "이메일 클라이언트가 열렸습니다. 내용을 확인하고 전송해주세요.";
  feedbackStatus.classList.remove("d-none");

  // 폼 초기화 (선택 사항)
  document.getElementById("feedbackForm").reset();
};
