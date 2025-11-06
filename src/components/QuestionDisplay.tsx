import React from 'react';
import { Question } from '../types/game';
import './QuestionDisplay.css';

interface QuestionDisplayProps {
  question: Question | null;
  timeLeft: number;
  timeLimit: number;
  feedback: { type: 'correct' | 'wrong' | null; message: string };
}

const QuestionDisplay: React.FC<QuestionDisplayProps> = ({
  question,
  timeLeft,
  timeLimit,
  feedback,
}) => {
  const timePercentage = (timeLeft / timeLimit) * 100;
  const isTimeWarning = timePercentage < 30;

  return (
    <div className="question-display">
      {question ? (
        <>
          <div className="question-text">{question.text}</div>
          <div className={`timer-bar ${isTimeWarning ? 'warning' : ''}`}>
            <div
              className="timer-fill"
              style={{ width: `${timePercentage}%` }}
            />
            <span className="timer-text">{Math.ceil(timeLeft)}초</span>
          </div>
          {feedback.type && (
            <div className={`feedback ${feedback.type}`}>
              {feedback.message}
            </div>
          )}
        </>
      ) : (
        <div className="question-text">문제를 준비 중...</div>
      )}
    </div>
  );
};

export default QuestionDisplay;

