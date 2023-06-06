import { useEffect, useReducer, useState } from 'react';
import SlideGrid from './SlideGrid/SlideGrid';
import SlideMap from './SlideMap/SlideMap';

function reducer(state, action){
    switch (action.type) {
        case 'define-chars':
            return action.payload;
        case 'select-by-id':
            return state.map(char=>{
                if(char.id===Number(action.payload.id)){
                    return {...char, selected: true}
                }
                return char;
            })        
        case 'unselect-all':{
            return state.map(char=>{
                return {...char, selected: false}
            });
        }
    }
    
    throw new Error(`Invalid '${action.type}' action type`);
}

function Slider({ lettersArray, handleAnswer, answer, settings }) {
    const rad = settings.width/2;

    const [chars, dispatch] = useReducer(reducer, [{size: settings.charSize}]);

    useEffect(()=>{
        const charsAux = lettersArray.map((letter, i)=>{
          return {
            id: i,
            letter: letter,
            x: Math.round(rad*(Math.sin((2*Math.PI/lettersArray.length)*i)+1)),
            y: Math.round(rad*(-Math.cos((2*Math.PI/lettersArray.length)*i)+1)),
            size: settings.charSize,
            selected: false
          }
        });
        dispatch({type: 'define-chars', payload: charsAux})
    },[lettersArray]);

    return (
        <div style={{position: 'relative', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
            <SlideMap
                lettersArray={chars}
                rad={rad}
                dispatch={dispatch}
                handleSelectedChars={handleAnswer}
                selectedChars={answer}
                lineColor={settings.lineColor}
            >
                <SlideGrid 
                    lettersArray={chars} 
                    rad={rad}
                    charBgColor={settings.charBgColor}
                    charBgColorSelected={settings.charBgColorSelected}
                />
            </SlideMap>
        </div>
    )
}

export default Slider