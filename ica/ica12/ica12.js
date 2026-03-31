const newQuoteButton = document.querySelector("#js-new-quote");
const answerButton = document.querySelector("#js-tweet");

const quoteText = document.querySelector("#js-quote-text");
const answerText = document.querySelector("#js-answer-text");

const endpoint = "https://trivia.cyberwisp.com/getrandomchristmasquestion";

newQuoteButton.addEventListener("click", getQuote);
answerButton.addEventListener("click", showAnswer);

let currentAnswer = "";

function getQuote() {
    console.log("Button clicked");

    fetch(endpoint)
        .then(response => response.json())
        .then(data => {
            console.log(data);

            const question = data.question;
            const answer = data.answer;

            currentAnswer = answer;

            displayQuote(question);
        })
        .catch(error => {
            console.error("Error fetching quote:", error);
            alert("Failed to fetch trivia. Try again.");
        });
}

function displayQuote(text) {
    quoteText.textContent = text;
    answerText.textContent = ""; 
}

function showAnswer() {
    answerText.textContent = currentAnswer;
}

getQuote();