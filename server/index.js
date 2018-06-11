const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const axios = require("axios");
const tControl = require("./controllers/trivia_controller");

//creates instance of express for server
const app = express();

app.use(bodyParser.json());
app.use(cors());
app.use(express.static("./build"));

//sets port
const port = 3001;

//gets a triviaQuestion from trivia_controller and sets to api/getTriviaQuestion
app.get("/api/getTriviaQuestion", tControl.getTriviaQuestion);
app.get("/api/getTriviaArraySize", tControl.getTriviaArraySize);
app.get("/api/getTriviaArray", tControl.getTriviaArray);
app.post("/api/getTriviaArray", tControl.postTriviaQuestion);
app.delete("/api/getTriviaArray/:id", tControl.deleteTriviaID);
app.put("/api/getTriviaArray/:id", tControl.putNewAnswer);

//set server to listen for requests
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
