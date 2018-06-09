const axios = require("axios");

let triviaArray = [];
let id = 0;

//API call using axios takes response and stores in triviaArray
axios.get("http://jservice.io/api/random?count=100").then(function(response) {
  triviaArray = response.data;
  console.log(triviaArray);
});

//pulls random question from Trivia array
const getTriviaQuestion = (req, res, next) => {
  var question = triviaArray[Math.floor(Math.random() * triviaArray.length)];
  res.status(200).send(question);
};

const triviaArraySize = triviaArray.length;

//exports getTriviaQuestion to index.js
module.exports = {
  getTriviaQuestion,
  triviaArraySize
};
