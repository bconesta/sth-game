"use client"

import Slider from '@/components/Slider/Slider';
import styles from './page.module.scss';
import { useEffect, useReducer, useState } from 'react';

export default function SlideGame() {

  const [queNumber, setQueNumber] = useState(0);
  const [lettersArray, setLettersArray] = useState([]);
  
  const [answer, setAnswer] = useState([]);
  const handleAnswer = (answer) => setAnswer(answer);

  const WHRatio = window.innerWidth/window.innerHeight;
  const width = WHRatio > 1 ? window.innerHeight*0.28 : window.innerHeight*0.28;

  const sliderSettings = {
    width : width,
    lineColor : '#a1ffa1',
    //rad : WHRatio > 1 ? 300 : 200,
    charSize : width*0.22,
    charColor : '#000',
    charBgColor : '#fff',
    charBgColorSelected : '#a1ffa1'
  };

  useEffect(()=>{
    setLettersArray(['A','B','C','D','E','F','G', 'H'])
  },[]);

  return (
    <div className={styles.container}>
        <div className={styles.questionContainer}>
          <p>
            {queNumber+1}. What is the next letter in the sequence?
          </p>
        </div>
        <div className={styles.answerContainer}>
          {lettersArray.map((letter, i)=>{
            return(
              <div key={letter+i} className={styles.answerChar}>
                {answer[i]!==undefined ? lettersArray[answer[i]] : ''}
              </div>
            )
          })}
        </div>
        <div className={styles.slideContainer}>
          <Slider 
            lettersArray={lettersArray}
            handleAnswer={handleAnswer}
            answer={answer}
            settings={sliderSettings}
          />
        </div>
    </div>
  )
}
