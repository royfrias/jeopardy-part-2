// Do not change the import statement
import placeholderQuestions from "./placeholder-questions.js";
// console.log({ placeholderQuestions });


let questionAnswered = false;

function renderCategories() {
  // This variable selects the six categorys divs.
  const categoryItems = document.querySelectorAll(".category-items");

  // This variable loops through the array of objects and picks out the categories
  // from the object
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
  // ex. [=NATURE=] [=ANIMALS=] [=COMPUTERS=] [=MYTHOLOGY=] [=HISTORY=] etc etc..
  categoryItems.forEach((element, indx) => {
    element.textContent = uniqueCategories[indx];
  });
}

function renderQuestions() {
  // const categories = document.querySelectorAll(".category-items");
  const gridItems = document.querySelectorAll(".grid-items");

  gridItems.forEach((item) => {
    item.addEventListener("click", () => {

      if(!questionAnswered){
        const category = item.dataset.category;
        const categoryQuestions = placeholderQuestions.filter(
          (question) => question.category === category
        );

        const randomQuestion = Math.floor(
          Math.random() * categoryQuestions.length
        );
        const selectedQuestion = categoryQuestions[randomQuestion];

        item.textContent = `${selectedQuestion.category} - ${selectedQuestion.points} points: ${selectedQuestion.question}`;

        questionAnswered = true;

       const guessButton = document.querySelector("#guess-btn");
       guessButton.addEventListener('click', ()=>{
         const userInput = document.querySelector("#input-div").value;
         if(userInput.trim().toLowerCase() === selectedQuestion.answer.toLocaleLowerCase()) {
            console.log("Your Answer Is Correct!");
         } else {
            console.group("Your Answer is Wrong!!")
         }
       })
      }
    });
  });
}

// placeholderQuestions.forEach((question) => renderQuestions(question));
renderCategories();
renderQuestions();
