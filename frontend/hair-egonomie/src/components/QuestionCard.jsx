import React, { useState, useEffect } from "react";

const QuestionCard = ({ mode }) => {
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/questions/")
      .then(res => res.json())
      .then(data => setQuestions(data.questions))
      .catch(err => console.error(err));
  }, []);

  return (
    <div>
      {questions.length === 0 ? (
        <p>Chargement des questions...</p>
      ) : (
        questions.map((q, index) => (
          <div key={index}>
            <p>{q}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default QuestionCard;
