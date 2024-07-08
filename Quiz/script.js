const questions = [
    {
        question: "The world’s nation 5G mobile network was launched by which country?",
        answers: ["China", "Malaysia", "Japan", "South Korea"],
        correct: 3
    },
    {
        question: "Which of the three banks will be merged with the other two to create India’s third-largest bank?",
        answers: ["Punjab National Bank", "Indian Bank", "Bank of Baroda", "Dena Bank"],
        correct: 1
    },
    {
        question: "Who wrote “Romeo and Juliet?",
        answers: ["Harper Lee", " William Shakespeare", "Ernest Hemingway", "Mark Twain"],
        correct: 1
    },
    {
        question: " The largest public sector undertaking in the country is?",
        answers: ["Railway", " Roadway", "Airway", "Waterway"],
        correct: 0
    },
    {
        question: "What is the name of the first Indian woman who wins the Man Booker Prize?",
        answers: ["Salman Rushdie", " V.S. Naipaul", "Kiran Desai", "Arundhati Roy"],
        correct: 3
    }

];

let currentQuestionIndex = 0;
let userAnswers = Array(questions.length).fill(null);
let score = 0;
let timer;
const timeLimit = 10; // seconds

const questionElement = document.getElementById('question');
const answersElement = document.getElementById('answers');
const prevButton = document.getElementById('prev-button');
const nextButton = document.getElementById('next-button');
const submitButton = document.getElementById('submit-button');
const resultContainer = document.getElementById('result-container');
const scoreElement = document.getElementById('score');
const reviewContainer = document.getElementById('review-container');
const timerElement = document.getElementById('timer');

function startQuiz() {
    showQuestion();
    startTimer();
}

function showQuestion() {
    const question = questions[currentQuestionIndex];
    questionElement.innerText = question.question;
    answersElement.innerHTML = '';

    question.answers.forEach((answer, index) => {
        const radioBtn = document.createElement('input');
        radioBtn.type = 'radio';
        radioBtn.name = 'answer';
        radioBtn.value = index;
        radioBtn.checked = userAnswers[currentQuestionIndex] === index;

        const label = document.createElement('label');
        label.innerText = answer;

        const br = document.createElement('br');

        answersElement.appendChild(radioBtn);
        answersElement.appendChild(label);
        answersElement.appendChild(br);
    });
    
    // prevButton.disabled = currentQuestionIndex === 0;
    nextButton.style.display = currentQuestionIndex === questions.length - 1 ? 'none' : 'inline-block';
    submitButton.style.display = currentQuestionIndex === questions.length - 1 ? 'inline-block' : 'none';
}

function startTimer() {
    let timeLeft = timeLimit;
    clearInterval(timer);
    timerElement.textContent = `${timeLeft} seconds left`; // Initialize timer display
    timer = setInterval(() => {
        if (timeLeft <= 0) {
            clearInterval(timer);
            nextQuestion();
        } else {
            console.log(timeLeft);
            timeLeft--;
            timerElement.innerText = `Time left:${timeLeft} seconds left`; // Update timer display
        }
    }, 1000);
}


function prevQuestion() {
    currentQuestionIndex--;
    showQuestion();
    startTimer();
}

function nextQuestion() {
    saveAnswer();
    currentQuestionIndex++;
    showQuestion();
    startTimer();
}

function saveAnswer() {
    const selectedAnswer = document.querySelector('input[name="answer"]:checked');
    if (selectedAnswer) {
        userAnswers[currentQuestionIndex] = parseInt(selectedAnswer.value);
    }
}



function submitQuiz() {
    saveAnswer();
    calculateScore();
    showResult();
}

function calculateScore() {
    score = userAnswers.reduce((acc, answer, index) => {
        return answer === questions[index].correct ? acc + 1 : acc;
    }, 0);
}

function showResult() {
    scoreElement.innerText = `Your score: ${score} out of ${questions.length}`;
    document.getElementById('quiz-container').style.display = 'none';
    resultContainer.style.display = 'block';
}

function reviewAnswers() {
    reviewContainer.innerHTML = '';
    questions.forEach((question, index) => {
        const questionReview = document.createElement('div');
        questionReview.innerText = question.question;
        
        const correctAnswer = document.createElement('div');
        correctAnswer.innerText = `Correct answer: ${question.answers[question.correct]}`;
        correctAnswer.style.color = 'green';

        const userAnswer = document.createElement('div');
        userAnswer.innerText = `Your answer: ${userAnswers[index] !== null ? question.answers[userAnswers[index]] : 'No answer'}`;
        userAnswer.style.color = userAnswers[index] === question.correct ? 'green' : 'red';

        reviewContainer.appendChild(questionReview);
        reviewContainer.appendChild(correctAnswer);
        reviewContainer.appendChild(userAnswer);
        reviewContainer.appendChild(document.createElement('hr'));
    });
    reviewContainer.style.display = 'block';
}

// Start the quiz when the page loads
window.onload = startQuiz;