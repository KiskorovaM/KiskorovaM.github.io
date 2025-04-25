const questions = [
  {
    question: "Какой оператор используется для объявления переменной в JavaScript?",
    answers: ["var", "let", "const", "Все перечисленные"],
    correct: 3
  },
  {
    question: "Какой метод используется для вывода информации в консоль?",
    answers: ["console.log()", "print()", "alert()", "document.write()"],
    correct: 0
  },
  {
    question: "Какое значение возвращает typeof null?",
    answers: ["null", "object", "undefined", "number"],
    correct: 1
  },
  {
    question: "Какой метод добавляет элемент в конец массива?",
    answers: ["push()", "pop()", "shift()", "unshift()"],
    correct: 0
  },
  {
    question: "Какой метод удаляет последний элемент массива?",
    answers: ["push()", "pop()", "shift()", "unshift()"],
    correct: 1
  },
  {
    question: "Что делает метод .slice()?",
    answers: ["Изменяет массив", "Возвращает часть массива", "Удаляет элемент", "Добавляет элемент"],
    correct: 1
  },
  {
    question: "Какой из этих типов данных не является примитивным?",
    answers: ["String", "Number", "Boolean", "Object"],
    correct: 3
  },
  {
    question: "Какой метод используется для преобразования строки в число?",
    answers: ["parseInt()", "toString()", "Number()", "All of the above"],
    correct: 3
  },
  {
    question: "Что такое IIFE в JavaScript?",
    answers: ["Immediately Invoked Function Expression", "Интерфейс функции", "Структура данных", "Массив"],
    correct: 0
  },
  {
    question: "Какой символ используется для комментариев в JavaScript?",
    answers: ["//", "#", "/* */", "/*"],
    correct: 0
  }
];

let currentQuestion = 0;
let score = 0;
const questionElement = document.createElement("p"); // Create the question element
const answersContainer = document.getElementById("answers");
const nextButton = document.getElementById("next");
const resultContainer = document.getElementById("result-container");
const resultText = document.getElementById("result");
const restartButton = document.getElementById("restart");

document.getElementById("quiz-container").insertBefore(questionElement, answersContainer); // Insert question element before answers

function loadQuestion() {
  const current = questions[currentQuestion];
  questionElement.textContent = current.question;
  answersContainer.innerHTML = "";
  current.answers.forEach((answer, index) => {
    const button = document.createElement("button");
    button.textContent = answer;
    button.classList.add("answer");
    button.onclick = () => checkAnswer(index);
    answersContainer.appendChild(button);
  });
  nextButton.style.display = "none";
}

function checkAnswer(index) {
  const buttons = document.querySelectorAll(".answer");
  buttons.forEach(button => button.disabled = true);
  if (index === questions[currentQuestion].correct) {
    buttons[index].classList.add("correct");
    buttons[index].innerHTML += " ✅"; // Add checkmark for correct answer
    score++;
  } else {
    buttons[index].classList.add("wrong");
    buttons[index].innerHTML += " ❌"; // Add cross for wrong answer
    buttons[questions[currentQuestion].correct].classList.add("correct");
    buttons[questions[currentQuestion].correct].innerHTML += " ✅"; // Add checkmark for correct answer
  }
  nextButton.style.display = "block";
}

nextButton.addEventListener("click", () => {
  currentQuestion++;
  if (currentQuestion < questions.length) {
    loadQuestion();
  } else {
    showResult();
  }
});

function showResult() {
  document.getElementById("quiz-container").style.display = "none";
  resultContainer.style.display = "block";
  resultText.textContent = `Вы ответили правильно на ${score} из ${questions.length} вопросов.`;
}

restartButton.addEventListener("click", () => {
  currentQuestion = 0;
  score = 0;
  resultContainer.style.display = "none";
  document.getElementById("quiz-container").style.display = "block";
  loadQuestion();
});

loadQuestion();
