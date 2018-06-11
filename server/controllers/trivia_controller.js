const axios = require("axios");

let triviaArray = [];
let id = 0;
var triviaArraySize = null;

//API call using axios takes response and stores in triviaArray
axios.get("http://jservice.io/api/random?count=100").then(function(response) {
  triviaArray = response.data;
  triviaArraySize = triviaArray.length;
  //console.log(triviaArraySize);
});

//pulls random question from Trivia array
const getTriviaQuestion = (req, res, next) => {
  var question = triviaArray[Math.floor(Math.random() * triviaArray.length)];
  res.status(200).send(question);
};

const getTriviaArraySize = (req, res, next) => {
  res.status(200).send(triviaArray.length);
};

const getTriviaArray = (req, res, next) => {
  res.status(200).send(triviaArray);
};

const deleteTriviaID = (req, res, next) => {
  console.log(req.params.id);

  let id = req.params.id;

  function isId(element) {
    return element.id == id;
  }
  let myIndex = triviaArray.findIndex(isId);

  // var index = triviaArray.findIndex(element => element == id);

  triviaArray.splice(myIndex, 1);
  res.status(200).send(triviaArray);
  //console.log(triviaArraySize);
};

//const updatedTriviaArraySize = triviaArraySize;
const postTriviaQuestion = (req, res, next) => {
  //   let newQuestion = req.body;
  let newQuestion = {
    id: req.body.id,
    answer: req.body.answer,
    question: req.body.question,
    value: req.body.value,
    category: req.body.category
  };
  triviaArray.push(newQuestion);

  res.status(200).send(triviaArray);
  // triviaArraySize = triviaArray.length;
};

const putNewAnswer = (req, res, next) => {
  let id = req.params.id;
  let answer = req.body.newAnswer;

  console.log(id);
  console.log(answer);

  function isId(element) {
    return element.id == id;
  }
  let myIndex = triviaArray.findIndex(isId);
  // console.log("huju", myIndex);
  // console.log(triviaArray[myIndex].answer);
  triviaArray[myIndex].answer = answer;
  res.status(200).send(triviaArray[myIndex]);
};

//exports getTriviaQuestion to index.js
module.exports = {
  getTriviaQuestion,
  getTriviaArraySize,
  getTriviaArray,
  postTriviaQuestion,
  deleteTriviaID,
  putNewAnswer
};
