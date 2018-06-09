import React, { Component } from "react";
import "./App.css";
import TriviaCard from "./components/TriviaCard/TriviaCard";

class App extends Component {
  render() {
    return (
      <div className="App">
        <h1>TRIVIA MOUNTAIN</h1>
        <TriviaCard />
      </div>
    );
  }
}

export default App;
