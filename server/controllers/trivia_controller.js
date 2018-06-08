const axios = require("axios");

let triviaArray = [];
let id = 0;

axios.get("http://jservice.io/api/random?count=100").then(function(response) {
  triviaArray = response.data;
  console.log(triviaArray);
});

const getTriviaQuestion = (req, res, next) => {
  var question = triviaArray[Math.floor(Math.random() * triviaArray.length)];
  res.status(200).send(question);
};

module.exports = {
  getTriviaQuestion
};
