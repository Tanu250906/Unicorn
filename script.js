const questions = [
    {
        question: "What genre do you prefer?",
        options: ["Romance", "Action", "Comedy", "Mystery"] 
    },
    { 
        question: "What mood are you in?", 
        options: ["Happy", "Sad", "Excited", "Relaxed"] 
    },
    { 
        question: "Do you prefer short dramas or long series?", 
        options: ["Short (8-12 episodes)", "Medium (12-20 episodes)", "Long (20+ episodes)", "Doesn't matter"] 
    }
];

// Function to load the current question
function loadQuestion(){
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

// Function to display recommendations
function showRecommendation() {
    const quizContainer = document.getElementById("quiz-container");
    quizContainer.innerHTML = `<h2>Your Perfect Drama Recommendation:</h2>`;
    
    let recommendation = "🌟 You should watch a drama based on " + userChoices.Q1 + "!";  
    quizContainer.innerHTML += `<p>${recommendation}</p>`;
}

// Load the first question when the page loads
window.onload = loadQuestion;