import { useEffect, useRef, useState } from 'react'

export default function SlideMap({ dispatch, rad, lettersArray, lineWidth, lineColor, children, handleSelectedChars, selectedChars }) {
  
  const [mouse, setMouse] = useState(false);
  
  const canvasRef = useRef(null);

  const styles = {
    canvas : {
        position : 'absolute',
        left : 0,
        top : 0
    },
    lineWidth : lineWidth || '18',
    lineColor : lineColor || 'white'
  }

  const drawLine = (ctx, x1, y1, x2, y2) => {
    ctx.beginPath();
    ctx.moveTo(x1,y1);
    ctx.lineTo(x2,y2);
    ctx.closePath();
    ctx.strokeStyle = styles.lineColor;
    ctx.lineWidth = styles.lineWidth;
    ctx.stroke();
  }

  const cleanCanvas = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, window.innerWidth, window.innerHeight/2);
    return ctx;
  }


  const start = e => {
    if(e.target.id){
      dispatch({type: 'select-by-id', payload: {id: e.target.id}});
      handleSelectedChars([Number(e.target.id)]);
      setMouse(true);
    }
  }

  const move = e => {
    if(e.target.id === '' && !mouse) return;
    const xOffstet = canvasRef.current.getBoundingClientRect().left;
    const yOffstet = canvasRef.current.getBoundingClientRect().top;
    const corX = (e.type.includes("mouse") ? e.pageX : e.changedTouches[0].pageX)-xOffstet;
    const corY = (e.type.includes("mouse") ? e.pageY : e.changedTouches[0].pageY)-yOffstet;
    const ctx = cleanCanvas();
    //Create lines between already selected chars
    selectedChars.forEach((charId, index)=>{
      if(index !== selectedChars.length-1){
        const char = lettersArray[charId];
        const nextChar = lettersArray[selectedChars[index+1]];
        drawLine(ctx, char.x+char.size/2, char.y+char.size/2, nextChar.x+nextChar.size/2, nextChar.y+nextChar.size/2);
      }
    })
    //Create line between last selected char and mouse/touch position
    if(selectedChars.join("") !== ""){
      const lastChar = lettersArray[selectedChars.slice(-1)];
      drawLine(ctx, lastChar.x+lastChar.size/2, lastChar.y+lastChar.size/2, corX, corY);
      //Analize if mouse/touch position is over a char and add it to selectedChars
      lettersArray.forEach(char=>{
        //Conditions to add char to selectedChars
        const isNotSelected = !selectedChars.includes(char.id);
        const isMouseClicked = (e.type.includes("mouse") && mouse) || !e.type.includes("mouse");
        const isOverChar = (corX < char.x+char.size && corX > char.x) && (corY < char.y+char.size && corY > char.y);
        if(isNotSelected && isOverChar && isMouseClicked){
          handleSelectedChars([...selectedChars, char.id]);
          dispatch({type: 'select-by-id', payload: {id: char.id}});
        }
      })
    }
  }

  const end = e => {
    handleSelectedChars([])
    dispatch({type: 'unselect-all'});
    setMouse(false);
    //props.handleChange(false);
    //props.handleEnd(true);
  }
  
  useEffect(()=>{
    if(selectedChars.join("") === "") cleanCanvas();
  }, [selectedChars])

  /*
  useEffect(()=>{
    setSelectedChars([])
  }, [props.queNumber])*/

  /*useEffect(()=>{
    move(props.move)
  }, [props.move])*/

  return (
    <div
      onTouchStart={start} 
      onTouchMove={move} 
      onTouchEnd={end} 
      onTouchCancel={end}
      onMouseDown={start}
      onMouseMove={move}
      onMouseUp={end}
      onMouseCancel={end}
    >
        <canvas 
          ref={canvasRef} 
          style={styles.canvas} 
          height={rad*2+(lettersArray[0] ? lettersArray[0].size : 0)} 
          width={rad*2+(lettersArray[0] ? lettersArray[0].size : 0)}
        />
        {children}
    </div>
  )
}
