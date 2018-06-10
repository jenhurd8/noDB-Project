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
      formValue: 1000000000000
    };
    this.next = this.next.bind(this);
    this.toggle = this.toggle.bind(this);
    // this.delete = this.delete.bind(this);
  }

  toggle() {
    console.log(this.state.triviaArraySize);
    this.setState({ showAnswer: !this.state.showAnswer });
  }

  //   delete(id) {
  //     axios
  //       .delete("http://localhost:3001/api/deleteTriviaID$`", { id: id })
  //       .then(response => {
  //         console.log(id);
  //         console.log("yes");
  //         this.setState({ triviaArraySize: this.state.triviaArraySize });
  //       });
  //   }

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
    this.createNewQuestion.preventDefault();

    axios
      .post(
        `http://localhost:3001/api/getTriviaArray/${this.state.formValue}`,
        {
          id: this.state.formValue,
          question: this.state.question,
          answer: this.state.answer,
          category: this.state.category,
          value: this.state.value
        }
      )
      .then(response => {
        // this.setState({
        //   id: this.state.id,
        //   question: this.state.question,
        //   answer: this.state.answer,
        //   category: this.state.category,
        //   value: this.state.value
        // });
      });
    this.setState({
      formValue: this.state.formValue + 1
    });

    // triviaArray.push(id, question, answer, category, value);
  }

  render() {
    return (
      <div>
        <h2 id="category">Category: {this.state.category}</h2>
        <h2>{this.state.question}</h2>
        <h2>for $ {this.state.value}</h2>
        <button onClick={this.toggle}>Toggle Answer</button>
        {this.state.showAnswer && <ToggleFunction answer={this.state.answer} />}
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
          <Button
            name={"Delete Question"}
            // onClick={() => this.delete(this.id)}
          />
          {/* <Button
            onClick={() => this.createNewQuestion}
            name={"Create new Question"}
          /> */}
        </div>
        <br />
        <h4>Create New Question Below</h4>
        <form onSubmit={() => this.createNewQuestion}>
          Question:
          <input type="text" name="question" placeholder="Enter a question" />
          <br />
          Answer:
          <input type="text" name="answer" placeholder="Enter the answer" />
          <br />
          Category:
          <input type="text" name="category" placeholder="Enter the category" />
          <br />
          Value:
          <input type="number" name="value" placeholder="500" />
          <br />
          {/* <input
            type="number"
            name="id"
            placeholder="Auto-generated"
            value={this.state.formValue}
          /> */}
          <br />
          <input type="submit" value="Submit" />
        </form>
      </div>
    );
  }
}
