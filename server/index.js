const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");
const tControl = require("./controllers/trivia_controller");

//creates instance of express for server
const app = express();

app.use(bodyParser.json());
app.use(express.static("./build"));

//sets port
const port = 3001;

//gets a triviaQuestion from trivia_controller and sets to api/getTriviaQuestion
app.get("/api/getTriviaQuestion", tControl.getTriviaQuestion);
app.get("/api/getTriviaArraySize", tControl.getTriviaArraySize);
app.get("/api/getTriviaArray", tControl.getTriviaArray);
app.post("/api/postTriviaQuestion", tControl.postTriviaQuestion);

//set server to listen for requests
app.listen(port, () => {
  console.log(`Server listTening on port ${port}`);
});
