import React, { Component } from "react";
import "./TriviaCard.css";
import axios from "axios";
import ToggleFunction from "./Toggle";

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
      value: 0
    };
    this.next = this.next.bind(this);
    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState({ showAnswer: !this.state.showAnswer });
  }

  componentDidMount() {
    axios.get("http://localhost:3001/api/getTriviaQuestion").then(response => {
      this.setState({
        id: response.data.id,
        question: response.data.question,
        answer: response.data.answer,
        value: response.data.value,
        category: response.data.category.title
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

  createSingleCard() {
    this.setState({
      category: this.state.obj.category.title,
      value: this.state.obj.value,
      question: this.state.obj.question,
      answer: this.state.obj.answer,
      id: this.state.obj.id
    });
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
      </div>
    );
  }
}
