const axios = require("axios");

let triviaArray = [];
let id = 0;
var triviaArraySize = null;

//API call using axios takes response and stores in triviaArray
axios.get("http://jservice.io/api/random?count=100").then(function(response) {
  triviaArray = response.data;
  triviaArraySize = triviaArray.length;
});

//pulls random question from Trivia array
const getTriviaQuestion = (req, res, next) => {
  var question = triviaArray[Math.floor(Math.random() * triviaArray.length)];
  res.status(200).send(question);
};

//const updatedTriviaArraySize = triviaArraySize;

const postTriviaQuestion = (req, res, next) => {
  const { name } = req.body;
  let newQuestion = {
    question,
    answer,
    category,
    value,
    id
  };
  triviaArray.push(newQuestion);
  res.status(200).send(triviaArray);
};

//exports getTriviaQuestion to index.js
module.exports = {
  getTriviaQuestion,
  postTriviaQuestion
};
