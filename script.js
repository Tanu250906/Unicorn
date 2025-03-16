// Questions and Recommendations
const questions = [
    { question: "What genre do you prefer?", options: ["Romance", "Action", "Comedy", "Mystery", "Thriller", "Fantasy"] },
    { question: "What mood are you in?", options: ["Happy", "Sad", "Excited", "Relaxed", "Curious", "Adventurous"] },
    { question: "Do you prefer short dramas or long series?", options: ["Short (8-12 episodes)", "Medium (12-20 episodes)", "Long (20+ episodes)", "Doesn't matter"] },
    { question: "Which language do you prefer?", options: ["Korean", "Japanese", "Chinese", "Thai", "Any"] },
    { question: "What kind of storyline do you enjoy?", options: ["Slow-burn Romance", "Fast-paced Action", "Mystery with Twists", "Light-hearted Comedy", "Emotional Rollercoaster"] },
    { question: "Do you prefer a happy ending or a bittersweet ending?", options: ["Happy Ending", "Bittersweet Ending", "Doesn't matter"] },
    { question: "Would you like a strong female lead?", options: ["Yes", "No", "Doesn't matter"] },
    { question: "What setting do you prefer?", options: ["Modern City", "Historical", "Fantasy World", "School Life", "Workplace"] }
];

const recommendations = {
    "Romance, Happy, Korean": ["🌸 'Business Proposal'", "💞 'Love O2O'", "❤️ 'What's Wrong with Secretary Kim'"],
    "Romance, Sad, Korean": ["💔 'Winter Sonata'", "😭 'Uncontrollably Fond'"],
    "Action, Excited, Japanese": ["🔥 'Alice in Borderland'", "⚡ 'Attack on Titan'"],
    "Action, Excited, Korean": ["⚔ 'Iris'", "🔫 'The K2'"],
    "Comedy, Relaxed, Chinese": ["😂 'Go Ahead'", "🤣 'My Amazing Boyfriend'"],
    "Mystery, Curious, Thai": ["🔎 'Girl From Nowhere'", "🧩 'The Stranded'"],
    "Mystery, Sad, Korean": ["👁 'Stranger'", "🕵️ 'Signal'", "🔍 'Beyond Evil'"],
    "Thriller, Adventurous, Korean": ["🩸 'Kingdom'", "🔪 'Vagabond'"],
    "Fantasy, Relaxed, Korean": ["🧙 'Goblin'", "✨ 'The Legend of the Blue Sea'"],
    "Fantasy, Curious, Chinese": ["🐉 'Eternal Love'", "🌠 'Ashes of Love'"],
    "Any, Any, Any": ["📺 'Try exploring new dramas! The world is full of hidden gems.'"]
};

// Track user progress and answers
let currentQuestionIndex = 0;
let userChoices = {};

// Function to load the current question
function loadQuestion() {
    const quizContainer = document.getElementById("quiz-container");
    const questionData = questions[currentQuestionIndex];
    quizContainer.innerHTML = `<p id="question">${questionData.question}</p>`;

    questionData.options.forEach(option => {
        const button = document.createElement("button");
        button.className = "option";
        button.textContent = option;
        button.onclick = () => selectAnswer(option);
        quizContainer.appendChild(button);
    });
}

// Function to handle answer selection
function selectAnswer(answer) {
    userChoices[`Q${currentQuestionIndex + 1}`] = answer;

    // Move to the next question or show result
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        loadQuestion();
    } else {
        showRecommendation();
    }
}

// Function to display the final drama recommendation
function showRecommendation() {
    const quizContainer = document.getElementById("quiz-container");
    quizContainer.innerHTML = `<h2>Your Perfect Drama Recommendation:</h2>`;

    // Create a broader key for better matching
    const broadKey = [userChoices.Q1, userChoices.Q2, userChoices.Q4].join(", ");
    const fallback = recommendations[broadKey] || recommendations["Any, Any, Any"];

    // Randomized suggestion if multiple matches exist
    const recommendation = fallback[Math.floor(Math.random() * fallback.length)];
    quizContainer.innerHTML += `<p>${recommendation}</p>`;

    // Restart button
    const restartButton = document.createElement("button");
    restartButton.textContent = "Restart Quiz";
    restartButton.className = "restart-button";
    restartButton.onclick = restartQuiz;
    quizContainer.appendChild(restartButton);
}

// Function to restart the quiz
function restartQuiz() {
    currentQuestionIndex = 0;
    userChoices = {};
    loadQuestion();
}

// Load the first question when the page loads
document.addEventListener("DOMContentLoaded", loadQuestion);