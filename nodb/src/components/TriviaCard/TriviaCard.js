import React, { Component } from "react";
import "./TriviaCard.css";
import axios from "axios";

export default class TriviaCard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      obj: {},
      id: 0,
      question: "",
      answer: "",
      category: "",
      value: 0
    };
  }
  componentDidMount() {
    axios.get("http://localhost:3001/api/getTriviaQuestion").then(
      response => {
        this.setState({ obj: response.data });
        console.log(this.state.obj.id);
      }
      //       console.log("success")
      //    this.state.id = id

      // this.state.id,
      // this.state.question,
      // this.state.answer,
      // this.state.category,
      // this.state.value
    );
  }
  render() {
    return "test======this.state.id";
  }
}
