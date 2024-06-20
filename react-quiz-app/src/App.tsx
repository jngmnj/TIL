import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { IQuestion, IUserAnswer } from './types';
import { getQuestionList } from './services/fetchQuestions';
import { Difficulty, totalQuestions } from './constants';

function App() {
  const [startQuiz, setStartQuiz] = useState(false);
  const [questions, setQuestions] = useState<IQuestion>([]);
  const [userAnswer, setUserAnswer] = useState<IUserAnswer>([]);
  const [loading, setLoading] = useState(true);
  const [questionNumber, setQuestionNumber] = useState(0);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  useEffect(() => {
    const fetchQuestions = async () => {
      const questionListing = await getQuestionList(
        totalQuestions, 
        Difficulty.EASY
      );
      setQuestions(questionListing);
      setLoading(false);
    }
    fetchQuestions();
  }, [])
  
  return (
    <>
    </>
  )
}

export default App
