let questions = [];

let currentQuestion;
let previousQuestionId = null;
let minQuestion = 1;
let maxQuestion = 255;

const minRange =
  document.getElementById("min-range");

const maxRange =
  document.getElementById("max-range");

minRange.addEventListener("input", () => {

  minQuestion = Number(minRange.value);

  document.getElementById("min-value")
    .textContent = minQuestion;



  // evitar min > max
  if (minQuestion > maxQuestion) {

    maxQuestion = minQuestion;

    maxRange.value = maxQuestion;

    document.getElementById("max-value")
      .textContent = maxQuestion;
  }

});

maxRange.addEventListener("input", () => {

  maxQuestion = Number(maxRange.value);

  document.getElementById("max-value")
    .textContent = maxQuestion;



  // evitar max < min
  if (maxQuestion < minQuestion) {

    minQuestion = maxQuestion;

    minRange.value = minQuestion;

    document.getElementById("min-value")
      .textContent = minQuestion;
  }

});  


//load question

async function loadQuestions() {

  const response = await fetch("questions.json");

  questions = await response.json();

  showQuestion();
}
// mostrar pregunta
function showQuestion() {

    document.getElementById("result")
  .textContent = "";

// filtrar preguntas por rango

const filteredQuestions =

  questions.filter(q => {

    return q.id >= minQuestion
      && q.id <= maxQuestion;

  });



// elegir random dentro del rango

let randomIndex;

do {

  randomIndex = Math.floor(

    Math.random() * filteredQuestions.length

  );

} while (

  filteredQuestions[randomIndex].id
  === previousQuestionId

);



currentQuestion =
  filteredQuestions[randomIndex];



previousQuestionId =
  currentQuestion.id;



  // mostrar texto
  document.getElementById("question")
    .textContent = currentQuestion.pregunta;



  // mostrar imagen
  const image =
    document.getElementById("question-image");

  if (currentQuestion.imagen !== "") {

    image.src = currentQuestion.imagen;

    image.style.display = "block";

  } else {

    image.style.display = "none";
  }



  // respuestas
  const answersDiv =
    document.getElementById("answers");

  answersDiv.innerHTML = "";


const shuffledOptions =
  [...currentQuestion.opciones]

    .sort(() => Math.random() - 0.5);

  // crear opciones
  shuffledOptions.forEach(option => {

    const label =
      document.createElement("label");



    const input =
      document.createElement("input");



    // radio o checkbox
    if (currentQuestion.seleccionar === 1) {

      input.type = "radio";

    } else {

      input.type = "checkbox";
    }



    input.name = "answer";

    input.value = option;



    label.appendChild(input);

    label.append(option);



    answersDiv.appendChild(label);

    answersDiv.appendChild(document.createElement("br"));

  });

}



// corregir
function checkAnswer() {

  const selected =

    [...document.querySelectorAll("input[name='answer']:checked")]

      .map(input => input.value);



  const correct =
    currentQuestion.correctas;



  // ordenar arrays
  selected.sort();

  correct.sort();



  const result =
    document.getElementById("result");



  if (

    JSON.stringify(selected)

    ===

    JSON.stringify(correct)

  ) {

    result.textContent = "⭕ Correct!";

  } else {

    result.textContent = "❌ Wrong!";
  }

}



// botón
document.getElementById("submit-btn")

  .addEventListener("click", checkAnswer);

document.getElementById("submit-btn")
  .addEventListener("click", checkAnswer);



document.getElementById("next-btn")
  .addEventListener("click", () => {

    showQuestion();

  });



// iniciar
loadQuestions();
// iniciar
loadQuestions();