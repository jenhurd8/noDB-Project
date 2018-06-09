const axios = require("axios");

let triviaArray = [];
let id = 0;
var triviaArraySize = null;

//API call using axios takes response and stores in triviaArray
axios.get("http://jservice.io/api/random?count=100").then(function(response) {
  triviaArray = response.data;
  triviaArraySize = triviaArray.length;
  console.log(triviaArraySize);
});

//pulls random question from Trivia array
const getTriviaQuestion = (req, res, next) => {
  var question = triviaArray[Math.floor(Math.random() * triviaArray.length)];
  res.status(200).send(question);
};

const getTriviaArraySize = (req, res, next) => {
  res.status(200).send(triviaArraySize);
};

const getTriviaArray = (req, res, next) => {
  res.status(200).send(triviaArray);
};

const deleteTriviaID = (req, res, next) => {
  const { id } = req.params;
  triviaArray.splice(id, 1);
  res.status(200).send(triviaArray);
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
  triviaArraySize = triviaArray.length;
};

//exports getTriviaQuestion to index.js
module.exports = {
  getTriviaQuestion,
  getTriviaArraySize,
  getTriviaArray,
  postTriviaQuestion,
  deleteTriviaID
};
