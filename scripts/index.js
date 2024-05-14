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
let selectedPoints = 0;
let answeredQuestions = []
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

nextButton.addEventListener("click", (e) => {
  window.location.href = "round-2.html";
});

// ENABLE BUTTONS function()
function enableButtons() {
  guessButton.disabled = false;
  passButton.disabled = false;
  nextButton.disabled = false;
}

function disableButtons() {
  guessButton.disabled = true;
  passButton.disabled = true;
  nextButton.disabled = true;
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
  answeredQuestions = [];
  
  // Define a function to handle the click event
  const handleClick = (item) => {
    // Check if a question is not already answered and the item is not a category
    if (!questionAnswered && !item.classList.contains("category-items")) {
      // Filter out any unanswered questions from the category
      const category = item.dataset.category;
      const unAnsweredQuestions = placeholderQuestions.filter(
        (question) =>
          question.category === category &&
          !answeredQuestions.includes(question.id)
      );

      // If there are unanswered questions
      if (unAnsweredQuestions.length > 0) {
        // Select a random question
        const randomQuestion =
          Math.floor(Math.random() * unAnsweredQuestions.length);
        selectedQuestion = unAnsweredQuestions[randomQuestion];

        // Update the selected grid item
        selectedGridItem = item;

        // Display the question text
        item.textContent = `${selectedQuestion.question}`;

        // Set the points value
        selectedPoints = parseInt(item.getAttribute("value"));

        // Mark the question as answered
        questionAnswered = true;

        // Add the answered question ID to the list
        answeredQuestions.push(selectedQuestion.id);

        // Remove the click event listener from the item
        item.removeEventListener("click", handleClick);

        // Enable buttons
        enableButtons();
      }
    }
  };

  // Iterate through each grid item
  gridItems.forEach((item) => {
    // Check if the item is an unanswered question
    if (!answeredQuestions.includes(parseInt(item.dataset.questionId))) {
      // Add a click event listener to the item
      item.addEventListener("click", () => handleClick(item));
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

  // checking for if a question is selected
  if(selectedQuestion) {
      const userInput = document.getElementById("input-div").value;
      if (
        // retrieves userinput via the input-div ID
        userInput.trim().toLowerCase() === selectedQuestion.answer.toLowerCase()
      ) {
        console.log("Your Answer Is Correct!");
        console.log(selectedPoints);
        eachplayersTurn();
        updateScore(currentPlayerIndex, selectedPoints); // update player's scores
        renderPlayerScores(); // renders updated scores
      
        questionAnswered = false;
        answeredQuestions = answeredQuestions.filter(
          (questionId) =>
            questionId !== (selectedQuestion ? selectedQuestion.id : null)
        );
        selectedGridItem.textContent = ""; // clears out

        // clears input field after answering question.
        document.getElementById("input-div").value = "";

        selectedQuestion = null;

        const remainingQuestions = placeholderQuestions.filter(
          (question) => !answeredQuestions.includes(question.id)
        );

        if (remainingQuestions.length > 0) {
          renderQuestions();
        } else {
          console.log("NO more questions remaining!");
        }
      } else {
        console.group("Your Answer is Wrong!!");
        eachplayersTurn();
      }
    } else {
      console.log("Please Select a question before answering");
    }
});

//calling my functions()
renderCategories();
renderQuestions();
eachplayersTurn();





