const questions = [
  {
    text: "Como você reage diante de um desafio inesperado no trabalho?",
    image: "imgs/img1.jpg",
    options: [
      { text: "A) Enfrento o problema de imediato, sem hesitar", house: "a" },
      { text: "B) Paro, analiso e busco a melhor solução lógica", house: "b" },
      { text: "C) Converso com o time e buscamos uma solução juntos", house: "c" },
      { text: "D) Penso em como virar o jogo a meu favor", house: "d" },
    ]
  },
  {
    text: "Qual dessas qualidades você mais valoriza em um colega de trabalho?",
    image: "imgs/img2.jpg",
    options: [
      { text: "A) Coragem e atitude", house: "a" },
      { text: "B) Inteligência e criatividade", house: "b" },
      { text: "C) Lealdade e empatia", house: "c" },
      { text: "D) Ambição e resultados", house: "d" },
    ]
  },
  {
    text: "Seu estilo de trabalho é mais...",
    image: "imgs/img3.jpg",
    options: [
      { text: "A) Rápido e prático – prefiro ação!", house: "a" },
      { text: "B) Detalhista e planejado – gosto de saber onde estou pisando", house: "b" },
      { text: "C) Colaborativo e acolhedor – ninguém faz nada sozinho", house: "c" },
      { text: "D) Estratégico e focado – penso sempre no próximo passo", house: "d" },
    ]
  },
  {
    text: "O que te motiva a seguir em frente?",
    image: "imgs/img4.jpg",
    options: [
      { text: "A) Superar limites e fazer a diferença", house: "a" },
      { text: "B) Aprender e expandir conhecimento", house: "b" },
      { text: "C) Ajudar os outros e sentir que contribuo com o time", house: "c" },
      { text: "D) Alcançar meus objetivos e crescer profissionalmente", house: "d" },
    ]
  },
  {
    text: "Em uma situação de conflito, você...",
    image: "imgs/img5.jpg",
    options: [
      { text: "A) Assume a liderança e resolve logo", house: "a" },
      { text: "B) Busca compreender todas as perspectivas", house: "b" },
      { text: "C) Tenta manter a harmonia entre as partes", house: "c" },
      { text: "D) Usa sua influência para conduzir o resultado desejado", house: "d" },
    ]
  }
];

const scores = { a: 0, b: 0, c: 0, d: 0 };
let currentQuestion = 0;

const preloadImages = [...questions.map(q => q.image), 'grifinoria.jpeg', 'corvinal.jpeg', 'lufalufa.jpeg', 'sonserina.jpeg'];
preloadImages.forEach(src => {
  const img = new Image();
  img.src = src;
});

function fadeOut(el, callback) {
  el.classList.remove('show');
  setTimeout(() => {
    if (callback) callback();
  }, 500);
}

function fadeIn(el) {
  setTimeout(() => {
    el.classList.add('show');
  }, 10);
}

function startQuiz() {
  const startScreen = document.getElementById("startScreen");
  const quiz = document.getElementById("quiz");

  // Cria a barra de progresso apenas se ainda não existir
  if (!document.querySelector(".progress-bar")) {
    const progressBar = document.createElement("div");
    progressBar.className = "progress-bar";
    progressBar.innerHTML = `<div id="progressFill" class="progress-fill"></div>`;
    quiz.prepend(progressBar);
  }

  fadeOut(startScreen, () => {
    startScreen.style.display = "none";
    quiz.style.display = "block";
    quiz.classList.add("fade");
    fadeIn(quiz);
    renderQuestion();
  });
}

function updateProgressBar() {
  const progressFill = document.getElementById("progressFill");
  const percent = ((currentQuestion + 1) / questions.length) * 100;
  if (progressFill) {
    progressFill.style.width = `${percent}%`;
  }
}

function renderQuestion() {
  const question = questions[currentQuestion];
  document.body.style.backgroundImage = `url('${question.image}')`;

  const questionDiv = document.getElementById("question");
  const optionsDiv = document.getElementById("options");
  const nextBtn = document.getElementById("nextBtn");

  questionDiv.innerHTML = `<h2>${question.text}</h2>`;
  optionsDiv.innerHTML = "";

  question.options.forEach(opt => {
    const btn = document.createElement("button");
    btn.textContent = opt.text;
    btn.onclick = () => {
      scores[opt.house]++;
      Array.from(optionsDiv.children).forEach(b => b.disabled = true);
      btn.style.backgroundColor = "#ffcf4a";
      btn.style.color = "#000";
      nextBtn.style.display = 'inline';
    };
    optionsDiv.appendChild(btn);
  });

  nextBtn.style.display = 'none';
  updateProgressBar();
}

function nextQuestion() {
  currentQuestion++;
  if (currentQuestion < questions.length) {
    renderQuestion();
  } else {
    showResult();
  }
}

function showResult() {
  const quiz = document.getElementById("quiz");
  fadeOut(quiz, () => {
    let max = Math.max(scores.a, scores.b, scores.c, scores.d);
    let house =
      scores.a === max ? "Grifinória" :
      scores.b === max ? "Corvinal" :
      scores.c === max ? "Lufa-Lufa" :
      "Sonserina";

    const houseImages = {
      "Grifinória": "imgs/casas/grifinoria.jpg",
      "Corvinal": "imgs/casas/corvinal.jpg",
      "Lufa-Lufa": "imgs/casas/lufalufa.jpg",
      "Sonserina": "imgs/casas/sonserina.jpg"
    };

    // Define imagem de fundo da tela de resultado
    document.body.style.background = "#000";
    document.body.style.backgroundImage = "url('imgs/result.png')";
    document.body.style.backgroundSize = "cover";
    document.body.style.backgroundPosition = "center";
    document.body.style.backgroundRepeat = "no-repeat";

    quiz.classList.add("result-screen");
    quiz.innerHTML = `
      <img src="${houseImages[house]}" alt="${house}" class="result-image">
    `;
    fadeIn(quiz);
  });
}

