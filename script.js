// 初始變數
let quizData = []; // 初始為空陣列，將從 JSON 加載
let currentQuestion = 0;
let userAnswers = [];
let totalQuestions = 0;

// 元素獲取
const quizContainer = document.getElementById("quiz-container");
const resultContainer = document.getElementById("result-container");
const reviewContainer = document.getElementById("review-container");
const questionEl = document.getElementById("question");
const optionsEl = document.getElementById("options");
const nextBtn = document.getElementById("next-btn");
const scoreEl = document.getElementById("score");
const encourageImg = document.getElementById("encourage-img");
const reviewBtn = document.getElementById("review-btn");
const reviewContent = document.getElementById("review-content");
const backBtn = document.getElementById("back-btn");

// 從 quizData.json 加載題庫
fetch("quizData.json")
    .then(response => {
        if (!response.ok) {
            throw new Error("無法加載 quizData.json");
        }
        return response.json();
    })
    .then(data => {
        quizData = data;
        totalQuestions = quizData.length;
        showQuestion(); // 加載完成後顯示第一題
    })
    .catch(error => {
        console.error("加載題庫失敗:", error);
        alert("無法加載題庫，請檢查 quizData.json 是否存在或格式是否正確。");
    });

// 顯示題目
function showQuestion() {
    const q = quizData[currentQuestion];
    questionEl.textContent = q.question;
    optionsEl.innerHTML = "";
    q.options.forEach(option => {
        const btn = document.createElement("button");
        btn.textContent = option;
        btn.classList.add("option");
        btn.onclick = () => selectAnswer(option);
        optionsEl.appendChild(btn);
    });
}

// 記錄答案並跳到下一題
function selectAnswer(answer) {
    userAnswers.push(answer);
    currentQuestion++;
    if (currentQuestion < totalQuestions) {
        showQuestion();
    } else {
        showResult();
    }
}

// 計算並顯示結果
function showResult() {
    quizContainer.style.display = "none";
    resultContainer.style.display = "block";
    
    let correct = 0;
    quizData.forEach((q, i) => {
        if (q.answer === userAnswers[i]) correct++;
    });
    const score = (correct / totalQuestions) * 100;
    scoreEl.textContent = `${score.toFixed(2)}%`;

    if (score < 30) {
        encourageImg.src = "low_score.jpg";
    } else if (score < 60) {
        encourageImg.src = "mid_score.jpg";
    } else if (score >= 85) {
        encourageImg.src = "high_score.jpg";
    } else {
        encourageImg.src = "default_score.jpg";
    }

    // 儲存 userAnswers 到 localStorage（可選）
    localStorage.setItem("userAnswers", JSON.stringify(userAnswers));
}

// 查看答案
reviewBtn.onclick = () => {
    resultContainer.style.display = "none";
    reviewContainer.style.display = "block";
    reviewContent.innerHTML = "";
    quizData.forEach((q, i) => {
        const div = document.createElement("div");
        div.innerHTML = `
            <p>題目: ${q.question}</p>
            <p>你的答案: ${userAnswers[i]} (${userAnswers[i] === q.answer ? "正確" : "錯誤"})</p>
            <p>正確答案: <button onclick="playSound('${q.pronunciation}')">${q.answer}</button></p>
        `;
        reviewContent.appendChild(div);
    });
};

// 播放發音
function playSound(file) {
    const audio = new Audio(file);
    audio.play();
}

// 返回結果頁面
backBtn.onclick = () => {
    reviewContainer.style.display = "none";
    resultContainer.style.display = "block";
};
