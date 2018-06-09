import React from "react";

const PostQuestion = props => {
  return <h2> Answer: {props.answer} </h2>;
};

//   createNewQuestion(id, question, answer, category, value) {
//     e.preventDefault();

//     axios.post("http://localhost:3001/api/postTriviaQuestion", {
//       id: this.state.id,
//       question: this.state.question,
//       answer: this.state.answer,
//       category: this.state.category,
//       value: this.state.value
//     }).then(response => {
//         this.setState({id:response.data, })
//     })
//     triviaArray.push(id, question, answer, category, value);
//   }

export default PostQuestion;
