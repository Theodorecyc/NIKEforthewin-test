// 題目數據（直接從你的 JSON 提取 questions 陣列）
const quizData = [
    { id: 1, level: 1, question: "「運球」的英文是？", options: ["Pass", "Dribble", "Shoot", "Block"], answer: 1, translation: "Dribble" },
    { id: 2, level: 1, question: "「傳球」的英文是？", options: ["Pass", "Dribble", "Rebound", "Screen"], answer: 0, translation: "Pass" },
    { id: 3, level: 1, question: "「搶籃板」的英文術語是？", options: ["Steal", "Assist", "Rebound", "Timeout"], answer: 2, translation: "Rebound" },
    { id: 4, level: 1, question: "「罰球」在英文中稱為？", options: ["Jump shot", "Layup", "Free throw", "Dunk"], answer: 2, translation: "Free throw" },
    { id: 5, level: 1, question: "「抄截」的英文是？", options: ["Block", "Steal", "Assist", "Travel"], answer: 1, translation: "Steal" },
    { id: 6, level: 1, question: "「助攻」的英文是？", options: ["Rebound", "Assist", "Screen", "Turnover"], answer: 1, translation: "Assist" },
    { id: 7, level: 1, question: "「火鍋」的英文是？", options: ["Block", "Charge", "Flop", "Screen"], answer: 0, translation: "Block" },
    { id: 8, level: 1, question: "「暫停」的英文是？", options: ["Foul", "Violation", "Timeout", "Jump ball"], answer: 2, translation: "Timeout" },
    { id: 9, level: 2, question: "「擋拆」的英文是？", options: ["Pick and roll", "Backdoor cut", "Fast break", "Alley-oop"], answer: 0, translation: "Pick and roll" },
    { id: 10, level: 2, question: "「區域聯防」的英文術語是？", options: ["Man defense", "Zone defense", " Press defense", "Transition"], answer: 1, translation: "Zone defense" },
    { id: 11, level: 2, question: "「走步違例」的英文是？", options: ["Double dribble", "Traveling", "Carry", "Goaltending"], answer: 1, translation: "Traveling" },
    { id: 12, level: 2, question: "「攻守轉換」的英文是？", options: ["Transition", "Screen", "Flop", "Rebound"], answer: 0, translation: "Transition" },
    { id: 13, level: 2, question: "「空中接力」的英文是？", options: ["Crossover", "Alley-oop", "Euro step", "Hook shot"], answer: 1, translation: "Alley-oop" },
    { id: 14, level: 2, question: "「快攻」的英文是？", options: ["Fast break", "Half-court offense", "Delay game", "Motion offense"], answer: 0, translation: "Fast break" },
    { id: 15, level: 2, question: "「二次運球違例」的英文是？", options: ["Traveling", "Double dribble", "Carry", "Backcourt"], answer: 1, translation: "Double dribble" },
    { id: 16, level: 2, question: "「24秒進攻時間」的英文是？", options: ["Game clock", "Shot clock", "Timeout", "Quarter"], answer: 1, translation: "Shot clock" },
    { id: 17, level: 3, question: "「牛角戰術」的英文是？", options: ["Horns set", "Princeton offense", "Flex cut", "Box-and-one"], answer: 0, translation: "Horns set" },
    { id: 18, level: 3, question: "「假摔」的英文術語是？", options: ["Charge", "Flop", "Block", "Screen"], answer: 1, translation: "Flop" },
    { id: 19, level: 3, question: "「歐洲步」的英文是？", options: ["Euro step", "Spin move", "Stepback", "Drop step"], answer: 0, translation: "Euro step" },
    { id: 20, level: 3, question: "「邊線發球戰術」的英文縮寫是？", options: ["BLOB", "SLOB", "ATO", "ICE"], answer: 1, translation: "SLOB (Sideline Out of Bounds)" },
    { id: 21, level: 3, question: "「包夾防守」的英文是？", options: ["Double team", "Help defense", "Closeout", "Hedge"], answer: 0, translation: "Double team" },
    { id: 22, level: 3, question: "「底線切入」的英文是？", options: ["Backdoor cut", "Flare cut", "V-cut", "L-cut"], answer: 0, translation: "Backdoor cut" },
    { id: 23, level: 3, question: "「掩護」的英文是？", options: ["Screen", "Pick", "Roll", "Pop"], answer: 0, translation: "Screen" },
    { id: 24, level: 3, question: "「全場緊迫防守」的英文是？", options: ["Full-court press", "Half-court press", "Zone press", "Man press"], answer: 0, translation: "Full-court press" },
    { id: 25, level: 4, question: "「賽後戰術分析」的英文縮寫是？", options: ["ATO", "BLOB", "LOB", "SCOUT"], answer: 3, translation: "Scouting Report" },
    { id: 26, level: 4, question: "「假掩護後切入」的英文術語是？", options: ["Ghost screen", "Flare screen", "Back screen", "Down screen"], answer: 0, translation: "Ghost screen" },
    { id: 27, level: 4, question: "「延遲進攻」的英文是？", options: ["Fast break", "Delay offense", "Transition", "Motion offense"], answer: 1, translation: "Delay offense" },
    { id: 28, level: 4, question: "「鎖定對方王牌球員的防守戰術」稱為？", options: ["Box-and-one", "2-3 zone", "Full-court press", "Hedge"], answer: 0, translation: "Box-and-one" },
    { id: 29, level: 4, question: "「罰球線延伸側的位置」英文稱為？", options: ["Elbow", "Wing", "Corner", "Top of the key"], answer: 0, translation: "Elbow" },
    { id: 30, level: 4, question: "「擋拆後衛的防守策略」英文是？", options: ["Hedge and recover", "Ice", "Switch", "Blitz"], answer: 0, translation: "Hedge and recover" },
    { id: 31, level: 4, question: "「暫停後設計的戰術」英文縮寫是？", options: ["ATO", "BLOB", "SLOB", "LOB"], answer: 0, translation: "ATO (After Timeout)" },
    { id: 32, level: 4, question: "「強弱邊轉移」的英文是？", options: ["Swing the ball", "Reverse the ball", "Skip pass", "Cross-court"], answer: 0, translation: "Swing the ball" }
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
    userAnswers.push(answerIndex);
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
            <p>正確答案: <button onclick="playSound('${q.translation.toLowerCase().replace(/ /g, '_')}.mp3')">${correctAnswerText}</button></p>
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
