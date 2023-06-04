import React, { useEffect, useRef } from 'react'

export default function SlideGrid({ lettersArray, rad, charBgColor, charBgColorSelected }) {

  const letterSize = lettersArray[0] ? lettersArray[0].size : 60;

  const styles = {
    container : {
      color : 'black',
      position : 'relative',
      width : rad*2+letterSize,
      height : rad*2+letterSize
    },
    letter : {
      position : 'absolute',
      fontFamily: 'arial',
      width : letterSize,
      height : letterSize,
      fontSize : letterSize*0.6,
      borderRadius : '50%',
      display : 'flex',
      justifyContent : 'center',
      alignItems : 'center',
      cursor: 'pointer',
      zIndex: 5
    }
  };

  const setStyles = (char) => {
    return {
      ...styles.letter,
      top : char.y,
      left : char.x,
      backgroundColor : char.selected ? charBgColorSelected : charBgColor,
      boxShadow : char.selected ? `0px 3px ${charBgColorSelected}` : '0 3px #D1D1D1'
    }
  }

  return (
    <div style={styles.container}>
      {lettersArray.map((letter, i)=>{
        return(
          <div 
            key={letter.letter+i} id={`${i}`} 
            style={setStyles(letter)}>
              {letter.letter}
          </div>
        )
      })}
    </div>
  )
}
