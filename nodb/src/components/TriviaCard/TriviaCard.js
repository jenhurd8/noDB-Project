import React, { Component } from "react";
import "./TriviaCard.css";
import axios from "axios";
import ToggleFunction from "./Toggle";
import Button from "./Button";

export default class TriviaCard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      obj: {},
      id: 0,
      question: "",
      answer: "",
      showAnswer: false,
      category: "",
      value: 0,
      triviaArraySize: 0,
      formValue: 1000000000000,
      formIndex: 101,
      newAnswer: ""
    };
    this.next = this.next.bind(this);
    this.toggle = this.toggle.bind(this);
    // this.delete = this.delete.bind(this);
  }

  toggle() {
    console.log(this.state.triviaArraySize);
    this.setState({ showAnswer: !this.state.showAnswer });
  }

  delete(id) {
    //console.log(this.state);
    // function isId(question) {
    //   return question.id === id;
    // }
    // triviaArray.findIndex(isId);
    console.log(id);
    axios
      .delete("http://localhost:3001/api/getTriviaArray/" + this.state.id)
      .then(response => {
        this.setState({
          id: response.id,
          question: response.question,
          answer: response.answer,
          showAnswer: response.showAnswer,
          category: response.category,
          value: response.value
        });
        console.log("yes");
      });
  }

  onChangeHandler = e => {
    this.setState({ newAnswer: e.target.value });
  };

  onSubmitHandler = e => {
    e.preventDefault();
    console.log(this.state.id);
    axios
      .put("http://localhost:3001/api/getTriviaArray/" + this.state.id, {
        newAnswer: this.state.newAnswer
      })
      .then(response => {
        console.log(response.data);
        this.setState({
          id: this.state.id,
          question: this.state.question,
          answer: response.data.answer,
          value: this.state.value,
          category: this.state.category.title,
          triviaArraySize: this.state.triviaArraySize
        });
        console.log(this.state.id);
      });
  };

  componentDidMount() {
    // axios
    //   .all([
    axios
      .get("http://localhost:3001/api/getTriviaQuestion")
      //     ,axios.get("http://localhost:3001/api/getTriviaArraySize")
      //   ])
      .then(response => {
        this.setState({
          id: response.data.id,
          question: response.data.question,
          answer: response.data.answer,
          value: response.data.value,
          category: response.data.category.title,
          triviaArraySize: response.data.triviaArraySize
        });
      });
  }

  next() {
    axios.get("http://localhost:3001/api/getTriviaQuestion").then(response => {
      this.setState({
        id: response.data.id,
        question: response.data.question,
        answer: response.data.answer,
        value: response.data.value,
        category: response.data.category.title,
        showAnswer: false
      });
    });
  }

  getTriviaArraySize() {
    axios.get("http://localhost:3001/api/getTriviaArraySize").then(response => {
      this.setState({
        triviaArraySize: response.data.triviaArraySize
      });
    });
  }

  createNewQuestion(id, question, answer, category, value) {
    // this.createNewQuestion.preventDefault();

    axios
      .post(
        `http://localhost:3001/api/getTriviaArray/${this.state.formIndex}`,
        {
          id: this.state.formValue,
          question: this.state.question,
          answer: this.state.answer,
          category: this.state.category,
          value: this.state.value
        }
      )
      .then(response => {
        this.setState({
          id: this.state.id,
          question: this.state.question,
          answer: this.state.answer,
          category: this.state.category,
          value: this.state.value,
          formValue: this.state.formValue + 1,
          formIndex: this.state.formIndex + 1
        });
      });
    // this.setState({

    // });

    // triviaArray.push(id, question, answer, category, value);
  }

  render() {
    console.log(this.state.answer);
    return (
      <div>
        <h2 id="category">Category: {this.state.category}</h2>
        <h2>{this.state.question}</h2>
        <h2>for $ {this.state.value}</h2>
        <button onClick={this.toggle}>Toggle Answer</button>
        {this.state.showAnswer && (
          <ToggleFunction
            answer={this.state.answer}
            newAnswer={this.state.newAnswer}
          />
        )}
        <br />
        <br />
        <br />
        <button onClick={() => this.next()}>NEXT QUESTION</button>
        <br />
        <br />
        <h5>Question ID#{this.state.id}</h5>
        <br />
        <div id="gameEditor">
          <h4>Game Editor</h4>
          <h3>Available Question Count: {this.state.triviaArraySize} </h3>
          <Button name={"Edit Question"} />

          <button
            name="Delete Question"
            onClick={() => this.delete(this.state.id)}
          >
            Delete
          </button>
          {/* <Button
            onClick={() => this.createNewQuestion}
            name={"Create new Question"}
          /> */}
        </div>
        <br />
        <h4>Correct The Answer Below:</h4>
        <form onSubmit={this.onSubmitHandler}>
          Answer:
          <input
            value={this.state.newAnswer}
            onChange={this.onChangeHandler}
            type="text"
            placeholder="Enter the answer"
          />
          <button>Submit new Answer</button>
        </form>
        {/* Question:
          <input type="text" name="question" placeholder="Enter a question" />
          <br /> */}
        {/* Category:
          <input type="text" name="category" placeholder="Enter the category" />
          <br />
          Value:
          <input type="number" name="value" placeholder="500" />
          <br />
          Auto Generated Question ID:{" "}
          <input type="number" defaultValue={this.state.formValue} />
          <br />
          */}
      </div>
    );
  }
}
