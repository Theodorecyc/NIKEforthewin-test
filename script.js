// 題目數據（示例）
const quizData = [
    { question: "1+1=?", options: ["1", "2", "3", "4"], answer: "2", pronunciation: "two.mp3" },
    { question: "2+2=?", options: ["2", "4", "6", "8"], answer: "4", pronunciation: "four.mp3" },
    // 可自行增加題目
];

let currentQuestion = 0;
let userAnswers = [];
const totalQuestions = quizData.length;

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
        encourageImg.src = "low_score.jpg"; // 替換為實際圖片路徑
    } else if (score < 60) {
        encourageImg.src = "mid_score.jpg";
    } else if (score >= 85) {
        encourageImg.src = "high_score.jpg";
    } else {
        encourageImg.src = "default_score.jpg"; // 60%-85% 的情況
    }
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

// 初始化
showQuestion();
