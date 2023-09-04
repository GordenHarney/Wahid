import {
    addDoc,
    collection,
    query,
    onSnapshot,
    orderBy,
    serverTimestamp,
  } from "firebase/firestore";
  import { useEffect, useState } from "react";
  import Question from "./Question";
  import { UserAuth } from "../context/AuthContext";
  import { db } from "../firebase";
  
  const ChatBox = () => {
    const [questions, setQuestions] = useState([]);
    const [answers, setAnswers] = useState({});
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(1);
    const [disabledStatus, setDisabledStatus] = useState({});
    const { currentUser } = UserAuth();
  
    useEffect(() => {
      const q = query(collection(db, "questions"), orderBy("sequence"));
      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const questionsArray = [];
        querySnapshot.forEach((doc) => {
          questionsArray.push({ ...doc.data(), id: doc.id });
        });
        setQuestions(questionsArray);
      });
  
      return () => unsubscribe();
    }, []);
  
    const handleAnswer = (answer) => {
      setAnswers((prevAnswers) => ({
        ...prevAnswers,
        [questions[currentQuestionIndex - 1].question]: answer,
      }));
  
      setDisabledStatus((prev) => ({
        ...prev,
        [currentQuestionIndex]: true,
      }));
  
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
    };
  
    const goBack = () => {
      setDisabledStatus((prev) => ({
        ...prev,
        [currentQuestionIndex - 1]: false,
      }));
      setCurrentQuestionIndex((prev) => prev - 1);
    };
  
    const saveToFirebase = async () => {
      try {
        await addDoc(collection(db, "chat_history"), {
          userId: currentUser.uid,
          answers,
          timestamp: serverTimestamp(),
        });
      } catch (error) {
        console.error("Error adding document: ", error);
      }
    };
  
    return (
      <div className="pb-44 pt-20 containerWrap">
        {questions.slice(0, currentQuestionIndex).map((q, index) => (
          <Question
            key={q.id}
            question={q}
            onAnswer={handleAnswer}
            goBack={goBack}
            notFirst={index !== 0}
            disabled={disabledStatus[index + 1]}
          />
        ))}
        {currentQuestionIndex === questions.length + 1 && (
          <button className="btn btn-block" onClick={saveToFirebase}>Submit Your Answers</button>
        )}
      </div>
    );
  };
  
  export default ChatBox;