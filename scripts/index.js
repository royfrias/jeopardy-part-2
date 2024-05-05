// Do not change the import statement
import placeholderQuestions from "./placeholder-questions.js";

// selecting my elements
const gridItems = document.querySelectorAll(".grid-items");
const guessButton = document.getElementById("guess-btn");
const passButton = document.getElementById("pass-btn");
const nextButton = document.querySelector("#next-round");


// this gives me the players so that I can use this to
// alternate between player 1 and 2 and also use the score.
const players = [
  { name: "Player 1", score: 0 },
  { name: "Player 2", score: 0 },
];

let questionAnswered = false;
let currentPlayerIndex = 0;
let answeredQuestions = [];
let selectedPoints = 0;
let selectedQuestion;
let selectedGridItem;

//This code allows me to click the play button and
//ReDirect me to round-1 page. And display that
//It is players 1 turn!
function eachplayersTurn() {
  const playersTurn = document.getElementById("players-turn");
  const currentPlayer = players[currentPlayerIndex];
  playersTurn.textContent = `${currentPlayer.name}'s turn`;
  currentPlayerIndex = (currentPlayerIndex + 1) % players.length;
}

passButton.addEventListener("click", (e) => {
  e.preventDefault();
  console.log("Im passing on the question");
  eachplayersTurn();
});

nextButton.addEventListener('click', (e) =>{
  window.location.href = "round-2.html";
})


// ENABLE BUTTONS function()
function enableButtons() {
  const guessButton = document.getElementById("guess-btn");
  const passButton = document.getElementById("pass-btn");
  const nextbutton = document.querySelector(".next-round-btn");

  guessButton.disabled = false;
  passButton.disabled = false;
  nextbutton.disabled = false;
}

function disableButtons() {
  const guessButton = document.getElementById("guess-btn");
  const passButton = document.getElementById("pass-btn");
  const nextbutton = document.querySelector(".next-round-btn");

  guessButton.disabled = true;
  passButton.disabled = true;
  nextbutton.disabled = true;
}

// This function updates the player score
function updateScore(playerIndex, points) {
  players[playerIndex].score += parseInt(points);
  console.log(
    `${players[playerIndex].name}'s score: ${players[playerIndex].score}`
  );
}

// this function renders the categories on the top of the page
// first line where it gives you all the categories
function renderCategories() {
  // This variable selects the six categorys divs.
  const categoryItems = document.querySelectorAll(".category-items");
  const categoryNames = placeholderQuestions.map(
    (question) => question.category
  );
  const uniqueCategories = [];
  categoryNames.forEach((category) => {
    if (!uniqueCategories.includes(category)) {
      uniqueCategories.push(category);
    }
  });
  //this loops through my category items divs and assigns the proper category name
  // ex. [=NATURE=] [=ANIMALS=] [=COMPUTERS=] [=MYTHOLOGY=] [=HISTORY=] [=GENERAL=] etc etc..
  categoryItems.forEach((element, indx) => {
    element.textContent = uniqueCategories[indx];
  });
}


// renderQuestion function is in charge of listening to clicks on the gridItems & 
// checks an unanswered question which the player then can answer
function renderQuestions() {
  // iterate through each gridItem in the gridItem using the forEach method
  gridItems.forEach((item) => {
    // we then check that the textContent of the chosen gridItem is not chosen or included in the answeredQuestions array i created
    if (!answeredQuestions.includes(item.textContent)) {
      item.addEventListener("click", () => {

      // we then check if a question is not already answered while making sure the specific
      // item doesn have the category-items class
        if (!questionAnswered && !item.classList.contains("category-items")) {
          //we then filter out any unanswered questions from the categorQuestions
          const category = item.dataset.category;
          const categoryQuestions = placeholderQuestions.filter(
            (question) => question.category === category
          );
          const unAnsweredQuestions = categoryQuestions.filter(
            (question) => !answeredQuestions.includes(question)
          );

          // we then randomize our questions through out the gridItems on the browser
          // based on our unAnsweredQuestions length basically displaying all of the grid with the hidden questions 
          if (unAnsweredQuestions.length > 0) {
            const randomQuestion = Math.floor(
              Math.random() * unAnsweredQuestions.length
            );
            selectedQuestion = unAnsweredQuestions[randomQuestion];
            item.textContent = `${selectedQuestion.question}`; // shows the question of the clicked gridItem
            questionAnswered = true; // adds question as i answered it
            answeredQuestions.push(selectedQuestion); // and then pushes it to the answeredQuestions array []

            selectedPoints = parseInt(item.getAttribute("value")); // this gives me the points value which i get from getAttribute method
            console.log(category);
            console.log("Clicked grid item textContent:", item.textContent); // log the textContent
            console.log("Points:", selectedPoints);

            selectedGridItem = item; // this assigns a gridItem the value that it was already chosen and the question answered, which will then leave that especific grid item blank
          }
        }
      });
    }
  });
}

// Function to render the scores of each player
function renderPlayerScores() {
  const player1score = document.querySelector("#player1score");
  const player2score = document.querySelector("#player2score");

  player1score.textContent = `Player 1 Score: ${players[0].score}`;
  player2score.textContent = `Player 2 Score: ${players[1].score}`;
}

// Event listener for guess button
guessButton.addEventListener("click", (e) => {
  e.preventDefault();
  const userInput = document.getElementById("input-div").value;
  if (
    userInput.trim().toLowerCase() === selectedQuestion.answer.toLowerCase()
  ) {
    console.log("Your Answer Is Correct!");
    console.log(selectedPoints);
    eachplayersTurn();
    updateScore(currentPlayerIndex, selectedPoints); // update player's scores
    renderPlayerScores(); // renders updated scores
    disableButtons(); // disable buttons after answering

    answeredQuestions.push(selectedQuestion); // pushes answered questions to array []
    selectedGridItem.textContent = ""; // clears out 

    const remainingQuestions = placeholderQuestions.filter(
      (question) => !answeredQuestions.includes(question)
    );
    if (remainingQuestions.length > 0) {
      questionAnswered = false;
      renderQuestions();
    } else {
      console.log("NO more questions remaining!");
    }
  } else {
    console.group("Your Answer is Wrong!!");
    eachplayersTurn();
    disableButtons(); // disables buttons after answering
  }
});

//calling my functions()
renderCategories();
renderQuestions();
eachplayersTurn();
enableButtons();
