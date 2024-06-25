import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { IQuestion, IUserAnswer } from './types';
import { getQuestionList } from './services/fetchQuestions';
import { Difficulty, totalQuestions } from './constants';
import AppSpinner from './Components';
import { Box, Heading, chakra } from '@chakra-ui/react';
import AppButton from './Components/AppButton';
import QuestionCard from './Components/QuestionCard';

function App() {
  const [startQuiz, setStartQuiz] = useState(false);
  const [questions, setQuestions] = useState<IQuestion[]>([]);
  const [userAnswer, setUserAnswer] = useState<IUserAnswer[]>([]);
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
  
  const startQuizGame = (): void => {
    setStartQuiz(true);
  }

  const checkAnswer = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    if(gameOver) return;

    const chosenAnswer = e.currentTarget.innerText;
    const correct = questions[questionNumber]?.correct_answer === chosenAnswer;
    
    // 정답이면 score + 1
    if(correct) setScore((previous) => previous + 1);

    // 마지막 정답 나열 페이지를 위한 데이터 생성
    const answerObject = {
      question: questions[questionNumber]?.question,
      answer: chosenAnswer,
      correct, 
      correctAnswer: questions[questionNumber]?.correct_answer
    }
    setUserAnswer((previous) => [...previous, answerObject]);
    
  }

  const nextQuestion = () => {
    const nextQuestion = questionNumber + 1;
    if(totalQuestions === nextQuestion) {
      setGameOver(true);
    }
    setQuestionNumber(nextQuestion);
  }

  const replayQuiz = () => {
    setStartQuiz(false);
    setGameOver(false);
    setQuestionNumber(0);
    setScore(0);
    setUserAnswer([]);
  };
  return (
    <main>
      {/* 00. Loading */}
      {loading && (
        <div className="app-spinner ">
          <AppSpinner
            speed="0.65s"
            emptyColor="gray.200"
            color="purple"
            size="lg"
            thickness="5px"
          />
        </div>
      )}
      {/* 01. Quiz Start Page */}
      {
      userAnswer.length === questionNumber && 
      !gameOver &&
      !loading &&
      !startQuiz ? (
        <div className='greeting-box'>
          <Box boxShadow="base" p="6" rounded="md" bg="white" maxW="560">
            <Heading as="h2" size="lg" mb={2}>
              퀴즈앱
            </Heading>
            <p>
              참 또는 거짓으로 대답할 수 있는 {totalQuestions}개의 질문이 제시됩니다. 
            </p>
            <AppButton
              colorScheme='purple'
              variant='solid'
              onClick={startQuizGame}
              value='Start Quiz Game'
            >

            </AppButton>
          </Box>
        </div>
      ) : null}
      {/* 02. Quiz Page */}
      {
        !loading && !gameOver && startQuiz && (
          <Box boxShadow="base" p="6" rounded="md" bg="white" maxW="560px">
            <QuestionCard 
              questions={questions[questionNumber].question}
              category={questions[questionNumber].category}
              checkAnswer={checkAnswer}
              totalQuestions={totalQuestions}
              questionNumber={questionNumber}
            />
            <AppButton 
              disabled={
                userAnswer.length === questionNumber + 1 &&
                questionNumber !== totalQuestions
                  ? false:
                  true              
              }
              colorScheme='purple'
              variant="solid"
              onClick={nextQuestion}
              value="Next Question"
              className='next-button'
              width='full'
            />
          </Box>
        )
      }
      {/* 03. Game Over */}
      {gameOver && (
        <>
          <Box boxShadow="base" p="6" rounded="md" bg="white" maxW="560px">
            <Box mb={4}>
              <Box fontWeight="bold" as="h3" fontSize="4xl">
                Game Over!
              </Box>
              <Box as="h3" fontSize="xl">
                Your score is {score}/{totalQuestions}.
              </Box>
            </Box>
            {userAnswer.map((answer, index) => (
              <Box key={index}>
                <div className='answer-list'>
                  <Box fontSize="md" fontWeight="bold">
                    Q. 
                    <p dangerouslySetInnerHTML={{__html: answer.question}} />
                  </Box>
                  <ul>
                    <li>You answered: {answer.answer}</li>
                    <li>Correct answer: {answer.correctAnswer}</li>
                  </ul>
                </div>
              </Box>
            ))}
            <AppButton 
              colorScheme='purple'
              variant='solid'
              onClick={replayQuiz}
              value="Replay Quiz"
              width="full"
            />
          </Box>
        </>
      )}
    </main>
  );
}

export default App
