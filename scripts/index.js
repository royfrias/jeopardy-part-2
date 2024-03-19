// Do not change the import statement
import placeholderQuestions from "./placeholder-questions.js";
// console.log({ placeholderQuestions });


// selecting my elements
const gridItems = document.querySelectorAll(".grid-items");
const guessButton = document.getElementById("guess-btn");
const passButton = document.getElementById("pass-btn");
const nextbutton = document.querySelector("#next-round");
// this gives me the players so that I can use this to 
// alternate between player 1 and 2 and also use the score.
const players = [
  { name: "Player 1", score: 0 },
  { name: "Player 2", score: 0 },
];

let questionAnswered = false;
let currentPlayerIndex = 0;



//This code allows me to click the play button and 
//ReDirect me to round-1 page. And display that 
//It is players 1 turn!
function eachplayersTurn() {
  const playersTurn = document.getElementById("players-turn");
  // let playButton = document.getElementById("play");
  const currentPlayer = players[currentPlayerIndex];
  // console.log(currentPlayer);
  playersTurn.textContent = `${currentPlayer.name}'s turn`;
  currentPlayerIndex = (currentPlayerIndex + 1) % players.length;
}


passButton.addEventListener('click', ()=>{
  console.log("Im passing on the question");
    eachplayersTurn();
});

// ENABLE BUTTONS function()
function enableButtons(){
  const guessButton = document.getElementById("guess-btn");
  const passButton = document.getElementById("pass-btn");
  const nextbutton = document.querySelector(".next-round-btn");

  guessButton.disabled = false;
  passButton.disabled = false;
  nextbutton.disabled = false;
}


// // This function updates the player score
function updateScore(player, points){
  // console.log(player);
  // console.log(points);
    player.score += parseInt(points); 
    console.log(`${player.name}'s score: ${player.score}`)
}


// forEach loop in order to loop through all the grid items and get all of the 
// points value from all of the grid-items such as 100, 200 , 300, 400, 500
function savePoints(){
    const pointsArray = [];
    gridItems.forEach((gridItem) => {
      if (!gridItem.classList.contains("category-items")) {
        const pointsText = gridItem.textContent;
        const points = parseInt(pointsText);
        // console.log(points);
        pointsArray.push(points);
      }
    });
    // console.log(pointsArray);
    return pointsArray;
}


// this function renders the categories on the top of the page
// first line where it gives you all the categories
function renderCategories() {
    // This variable selects the six categorys divs.
    const categoryItems = document.querySelectorAll(".category-items");

    // This variable loops through the array of objects and picks out the categories
    // from the object
    const categoryNames = placeholderQuestions.map((question) => question.category);
    // console.log(categoryNames)
    // we then declare a empty array so that we can push 
    // the categories into the array
    const uniqueCategories = [];
    categoryNames.forEach((category) => {
      // console.log(category)
      if (!uniqueCategories.includes(category)) {
        uniqueCategories.push(category);
      }
      // console.log(uniqueCategories)s
    });

    //this loops through my category items divs and assigns the proper category name
    // ex. [=NATURE=] [=ANIMALS=] [=COMPUTERS=] [=MYTHOLOGY=] [=HISTORY=] [=GENERAL=] etc etc..
    categoryItems.forEach((element, indx) => {
      // console.log(element);
      // console.log(indx);
       element.textContent = uniqueCategories[indx];
    });
}


function renderQuestions() {
  // const categories = document.querySelectorAll(".category-items");
  const gridItems = document.querySelectorAll(".grid-items");
  // this loop will loop around a p
  gridItems.forEach((item) => {
  item.addEventListener("click", () => {

   if(!questionAnswered) {
    //this variable will give you a category based on what you click
    //if you click a Animals selection for the question on the browser
    //it will give you that based on the category.
    const category = item.dataset.category;
    console.log(category);
    //This Variable with the filter method basically filters the questions from each
    //category, So if you go to the Animals category it will loop and filter out all of the 
    //questions on the Animals category that are on the placeholderQuestions Object
    const categoryQuestions = placeholderQuestions.filter((question) => question.category === category);
  
    console.log(categoryQuestions);

    //this variable here practically randomizes my questions
    // so when i refresh the questions are randomized on the browser
    const randomQuestion = Math.floor(
      Math.random() * categoryQuestions.length
    );
    const selectedQuestion = categoryQuestions[randomQuestion];
    // console.log(selectedQuestion);
    item.textContent = `${selectedQuestion.question}`;

    questionAnswered = true;


    //this code will allow us once we choose the question 
    //for what ever category, we will be able to input it 
    //and submit it via the input we have. It will then 
    //console.log if the answer is correct or wrong.
    const guessButton = document.querySelector("#guess-btn");
    guessButton.addEventListener('click', ()=> {
      const userInput = document.querySelector("#input-div").value;
      enableButtons();
      if(userInput.trim().toLowerCase() === selectedQuestion.answer.toLowerCase()) {
        console.log("Your Answer Is Correct!");
        updateScore(players[currentPlayerIndex], selectedQuestion.points);
        renderPlayerScores();
        eachplayersTurn();
        enableButtons();
      } else {
        console.group("Your Answer is Wrong!!");
        eachplayersTurn();
        enableButtons();
      }
 });
  

  // this function renders the scores of each player 
  function renderPlayerScores(){
      const player1score = document.querySelector("#player1score");
      const player2score = document.querySelector("#player2score");

      player1score.textContent = `Player 1 Score : ${players[0].score}`
      player2score.textContent = `Player 2 Score : ${players[1].score}`;

      console.log(
        (player1score.textContent = `Player 1 Score : ${players[0].score}`)
      );
  }

      }
    });
  });
}

//calling my functions()
renderCategories();
renderQuestions();
eachplayersTurn();
enableButtons();
updateScore(players[0], savePoints());
updateScore(players[1], savePoints());
savePoints();