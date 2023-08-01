const targetVerbElement = document.getElementById("targetVerb");
const targetFormElement = document.getElementById("targetForm");
const answerInputElement = document.getElementById("answer");
const resultMessageElement = document.getElementById("resultMessage");
const otherForm1Element = document.getElementById("otherForm1");
const otherForm2Element = document.getElementById("otherForm2");
const otherForm3Element = document.getElementById("otherForm3");
const otherForm4Element = document.getElementById("otherForm4");
const verbMeaningElement = document.getElementById("verbMeaning");
const sessionStatsElement = document.getElementById("sessionStats");

const allForms = [ 
  {name:"teForm", val:"Vて"},
  {name:"masuForm", val:"Vます"},
  {name:"taForm", val:"Vた"},
  {name:"naiForm", val:"Vない"},
  {name:"dictionaryForm", val:"Vる"},
]

let currentVerbIndex = 0;
let correctAnswers = 0;
let totalAttempts = 0;

const verbsData = JSON.parse(verbsDataJSON);
let cachedVerbData = null;
let cachedOrgForm = null;

function displayRandomVerb() {
  if (verbsData.length === 0) {
    return;
  }

  const randomVerb = verbsData[Math.floor(Math.random() * verbsData.length)];
  cachedVerbData = randomVerb;

  //const forms = ["Vて", "Vます", "Vた", "Vない"];
  const randomForm = allForms[Math.floor(Math.random() * allForms.length)];
  var orgForm = allForms[Math.floor(Math.random() * allForms.length)];
  while(orgForm.name == randomForm.name)
    orgForm = allForms[Math.floor(Math.random() * allForms.length)];
  cachedOrgForm = orgForm.name;

  targetVerbElement.textContent = `${randomVerb[orgForm.name]} (${randomVerb.pronunciation})`;
  targetFormElement.textContent = randomForm.val;

  answerInputElement.value = "";
  resultMessageElement.textContent = "";
  otherForm1Element.textContent = "";
  otherForm2Element.textContent = "";
  otherForm3Element.textContent = "";
  otherForm4Element.textContent = "";
  verbMeaningElement.textContent = "";
}

function checkAnswer(event) {
  event.preventDefault(); 

  resultMessageElement.textContent = "";

  const userAnswer = answerInputElement.value.trim();
  const correctAnswer = getCorrectAnswer();

  const isCorrect = userAnswer === correctAnswer;

  if (isCorrect) {
    resultMessageElement.textContent = "おめでとう！🎊";
    correctAnswers++;
  } else {
    resultMessageElement.textContent = `😔➡️ ${correctAnswer}`;
  }

  totalAttempts++;
  sessionStatsElement.textContent = `✅ ${correctAnswers}/${totalAttempts}`;

  if (cachedVerbData) {
      otherForm1Element.textContent = `Vます: ${cachedVerbData.masuForm}`;
      otherForm2Element.textContent = `Vて: ${cachedVerbData.teForm}`;
      otherForm3Element.textContent = `Vた: ${cachedVerbData.taForm}`;
      otherForm4Element.textContent = `Vない: ${cachedVerbData.naiForm}`;
      verbMeaningElement.textContent = `Meaning: ${cachedVerbData.meaning}`;
    }

  if (isCorrect) {
    setTimeout(displayRandomVerb, 2000);
  }
  else
  {
    setTimeout(displayRandomVerb, 7000);
  }
}

function getCorrectAnswer() {
  const displayedVerb = targetVerbElement.textContent.split(" ")[0]; 
  const displayedForm = targetFormElement.textContent;
  
  const verb = verbsData.find(v => v[cachedOrgForm] === displayedVerb);
  
  switch (displayedForm) {
    case "Vて":
      return verb.teForm;
    case "Vます":
      return verb.masuForm;
    case "Vた":
      return verb.taForm;
    case "Vない":
      return verb.naiForm;
    case "Vる":
      return verb.dictionaryForm;
    default:
      return "";
  }
}
const nextVerbButton = document.getElementById("nextVerbButton");

function handleNextVerbButtonClick() {
  displayRandomVerb();
}

document.getElementById("answerForm").addEventListener("submit", checkAnswer);
nextVerbButton.addEventListener("click", handleNextVerbButtonClick);

//displayRandomVerb();
