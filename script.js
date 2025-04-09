// 題目數據（直接從你的 JSON 提取 basketball_terminology_quiz）
const quizData = [
    {
        level: 1,
        question: "「運球」的英文是？",
        options: ["Pass", "Dribble", "Shoot", "Block"],
        answer: 1, // 對應 "Dribble"
        translation: "Dribble"
    },
    {
        level: 1,
        question: "「傳球」的英文是？",
        options: ["Pass", "Dribble", "Rebound", "Screen"],
        answer: 0, // 對應 "Pass"
        translation: "Pass"
    },
    {
        level: 1,
        question: "「搶籃板」的英文術語是？",
        options: ["Steal", "Assist", "Rebound", "Timeout"],
        answer: 2, // 對應 "Rebound"
        translation: "Rebound"
    },
    {
        level: 2,
        question: "「擋拆」的英文是？",
        options: ["Pick and roll", "Backdoor cut", "Fast break", "Alley-oop"],
        answer: 0, // 對應 "Pick and roll"
        translation: "Pick and roll"
    },
    {
        level: 2,
        question: "「區域聯防」的英文術語是？",
        options: ["Man defense", "Zone defense", "Press defense", "Transition"],
        answer: 1, // 對應 "Zone defense"
        translation: "Zone defense"
    },
    {
        level: 2,
        question: "「走步違例」的英文是？",
        options: ["Double dribble", "Traveling", "Carry", "Goaltending"],
        answer: 1, // 對應 "Traveling"
        translation: "Traveling"
    },
    {
        level: 3,
        question: "「牛角戰術」的英文是？",
        options: ["Horns set", "Princeton offense", "Flex cut", "Box-and-one"],
        answer: 0, // 對應 "Horns set"
        translation: "Horns set"
    },
    {
        level: 3,
        question: "「歐洲步」的英文是？",
        options: ["Euro step", "Spin move", "Stepback", "Drop step"],
        answer: 0, // 對應 "Euro step"
        translation: "Euro step"
    },
    {
        level: 3,
        question: "「邊線發球戰術」的英文縮寫是？",
        options: ["BLOB", "SLOB", "ATO", "ICE"],
        answer: 1, // 對應 "SLOB"
        translation: "SLOB (Sideline Out of Bounds)"
    },
    {
        level: 4,
        question: "「假掩護後切入」的英文術語是？",
        options: ["Ghost screen", "Flare screen", "Back screen", "Down screen"],
        answer: 0, // 對應 "Ghost screen"
        translation: "Ghost screen"
    },
    {
        level: 4,
        question: "「罰球線延伸側的位置」英文稱為？",
        options: ["Elbow", "Wing", "Corner", "Top of the key"],
        answer: 0, // 對應 "Elbow"
        translation: "Elbow"
    }
];

// 初始變數
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
    q.options.forEach((option, index) => {
        const btn = document.createElement("button");
        btn.textContent = option;
        btn.classList.add("option");
        btn.onclick = () => selectAnswer(index); // 記錄選項索引
        optionsEl.appendChild(btn);
    });
}

// 記錄答案並跳到下一題
function selectAnswer(answerIndex) {
    userAnswers.push(answerIndex); // 儲存用戶選擇的索引
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
        if (q.answer === userAnswers[i]) correct++; // 比對索引
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
        const userAnswerIndex = userAnswers[i];
        const userAnswerText = q.options[userAnswerIndex] || "未作答";
        const correctAnswerText = q.options[q.answer];
        const div = document.createElement("div");
        div.innerHTML = `
            <p>題目: ${q.question}</p>
            <p>你的答案: ${userAnswerText} (${userAnswerIndex === q.answer ? "正確" : "錯誤"})</p>
            <p>正確答案: <button onclick="playSound('${q.translation.toLowerCase()}.mp3')">${correctAnswerText}</button></p>
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
