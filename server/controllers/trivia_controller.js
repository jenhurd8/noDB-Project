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
  res.status(200).send(triviaArray.length);
};

const getTriviaArray = (req, res, next) => {
  res.status(200).send(triviaArray);
};

const deleteTriviaID = (req, res, next) => {
  //keep this id function is working to locate index --https://www.youtube.com/watch?v=QL5jKmVPvUY
  const { id } = req.params.id;

  function isId(question) {
    return question.id === id;
  }
  triviaArray.findIndex(isId);
  triviaArray.splice(isId, 1);
  res.status(200).send(triviaArray);
  console.log(triviaArraySize);
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

const putNewCategory = (req, res, next) => {
  const category = req.body.category.title;

  const { id } = req.params.id;
  function isId(question) {
    return question.id === id;
  }
  triviaArray.findIndex(isId);

  triviaArray[isId].push(triviaArray.category.title);
  res.status(200).send(triviaArray);
};

//exports getTriviaQuestion to index.js
module.exports = {
  getTriviaQuestion,
  getTriviaArraySize,
  getTriviaArray,
  postTriviaQuestion,
  deleteTriviaID,
  putNewCategory
};
