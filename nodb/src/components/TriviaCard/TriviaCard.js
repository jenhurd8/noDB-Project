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
      formValue: 100000000000,
      formIndex: 101,
      newAnswer: "",
      newQuestion: "",
      newCategory: "",
      newValue: 0
    };
    this.next = this.next.bind(this);
    this.toggle = this.toggle.bind(this);
    this.delete = this.delete.bind(this);
  }

  toggle() {
    console.log(this.state.triviaArraySize);
    this.setState({ showAnswer: !this.state.showAnswer });
  }

  delete(id) {
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
  onChangeHandler1 = e => {
    this.setState({ newQuestion: e.target.value });
  };
  onChangeHandler2 = e => {
    this.setState({ newCategory: e.target.value });
  };
  onChangeHandler3 = e => {
    this.setState({ newValue: e.target.value });
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

  createNewQuestionHandler = e => {
    e.preventDefault();
    console.log(this.state.id);
    axios
      .post(
        `http://localhost:3001/api/getTriviaArray/${this.state.formIndex}`,
        {
          id: this.state.formValue,
          question: this.state.newQuestion,
          answer: this.state.newAnswer,
          category: this.state.newCategory,
          value: this.state.newValue,
          formIndex: this.state.formIndex,
          formValue: this.state.formValue
        }
      )
      .then(response => {
        console.log(response.data);
        this.setState({
          id: response.data.id,
          question: this.state.newQuestion,
          answer: this.state.newAnswer,
          category: this.state.newCategory,
          value: this.state.newValue,
          formIndex: this.state.formIndex,
          formValue: this.state.formValue
        });
        this.setState({
          formValue: this.state.formValue + 1,
          formIndex: this.state.formIndex + 1
        });
      });
  };

  componentDidMount() {
    axios.get("http://localhost:3001/api/getTriviaQuestion").then(response => {
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
        {/* //<button onClick={() => this.next()}>NEXT QUESTION</button> */}
        <Button onClick={() => this.next()} name={"NEXT QUESTION"} />
        <br />
        <br />
        <h5>Question ID#{this.state.id}</h5>
        <br />
        <div id="gameEditor">
          <h4>Game Editor</h4>
          {/* <h3>Available Question Count: {this.state.triviaArraySize} </h3> */}
          <Button
            onClick={() => this.delete(this.state.id)}
            name={"Delete this Question"}
          />
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
        <h4>Add Your Own Question:</h4>
        <form onSubmit={this.createNewQuestionHandler}>
          Question:
          <input
            type="text"
            value={this.state.newQuestion}
            onChange={this.onChangeHandler1}
            placeholder="Enter a question"
          />
          <br />
          Answer:
          <input
            value={this.state.newAnswer}
            onChange={this.onChangeHandler}
            type="text"
            placeholder="Enter the answer"
          />
          <br />
          Category:
          <input
            type="text"
            placeholder="Enter the category"
            value={this.state.newCategory}
            onChange={this.onChangeHandler2}
          />
          <br />
          Value:
          <input
            type="number"
            placeholder="500"
            value={this.state.newValue}
            onChange={this.onChangeHandler3}
          />
          <br />
          Auto Generated Question ID:{" "}
          <input type="number" defaultValue={this.state.formValue} />
          <br />
          <button>Submit new Question</button>
        </form>
      </div>
    );
  }
}
