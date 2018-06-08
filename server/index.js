const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");
const tControl = require("./controllers/trivia_controller");

const app = express();

app.use(bodyParser.json());
app.use(express.static("./build"));

// let triviaArray = [];
// let id = 0;

// axios.get("http://jservice.io/api/random?count=100").then(function(response) {
//   triviaArray = response.data;
//   console.log(triviaArray);
// });

const port = 3001;

// app.get("/api/test", (req, res) => {
//   res.status(200).send({ message: "connected!" });
// });

app.get("/api/getTriviaQuestion", tControl.getTriviaQuestion);

app.listen(port, () => {
  console.log(`Server listTening on port ${port}`);
});
