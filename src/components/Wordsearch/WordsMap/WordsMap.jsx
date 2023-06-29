import { useEffect, useRef, useState } from "react";

function WordsMap({ children, settings, chars, dispatch, answers, handleCount }) {
    
    const canvasRef = useRef(null);
    
    const [path, setPath] = useState([]);
    const [isEnded, setIsEnded] = useState(true);

    const styles = {
        canvas: {
            position: 'absolute',
            top: 0,
            left: 0,
            zIndex: 1
        }
    }

    const getCords = (e, canvas) => {
        const xOffstet = canvas.current.getBoundingClientRect().left;
        const yOffstet = canvas.current.getBoundingClientRect().top;
        const x = (e.type.includes("mouse") ? e.pageX : e.changedTouches[0].pageX)-xOffstet;
        const y = (e.type.includes("mouse") ? e.pageY : e.changedTouches[0].pageY)-yOffstet;
        return { x, y }
    }

    const start = (e) => {
        e.preventDefault();
        const cords = getCords(e, canvasRef);
        const i = Math.floor(cords.y / chars[0][0].size);
        const j = Math.floor(cords.x / chars[0][0].size);
        dispatch({ type: 'define-start', payload: { i, j } });
        setPath([...path, [{i, j}, {i, j}]]);
        setIsEnded(false);
    }

    const move = (e) => {
        e.preventDefault();
        if(isEnded) return;
        const cords = getCords(e, canvasRef);
        const i = Math.floor(cords.y / chars[0][0].size);
        const j = Math.floor(cords.x / chars[0][0].size);
        if((Math.abs(path[path.length-1][0].i-i) === Math.abs(path[path.length-1][0].j-j)) || (path[path.length-1][0].i === i || path[path.length-1][0].j === j)){
            dispatch({ type: 'define-end', payload: { i, j } });
            setPath(path=>[...path.slice(0, path.length-1), [path[path.length-1][0], {i, j}]]);
        }
    }

    const end = (e) => {
        e.preventDefault();        
        setIsEnded(true);
        console.log(path);
    }

    //Draw path
    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, settings.width, settings.height);
        
        
        path.forEach((line) => {
            ctx.beginPath();

            const size = chars[0][0].size;
            const rad = size*0.35;
            const startl = { x: line[0].j*size+size/2, y: line[0].i*size+size/2 };
            const endl = { x: line[1].j*size+size/2, y: line[1].i*size+size/2 };
            if(startl.x === endl.x && startl.y === endl.y){
                ctx.moveTo(startl.x, startl.y);
                ctx.arc(startl.x, startl.y, size*0.325, 0, 2*Math.PI, true);
            }
            else if(startl.x === endl.x){
                ctx.fillRect(startl.x-rad, startl.y, 2*rad, endl.y-startl.y);
                ctx.moveTo(startl.x, startl.y);
                ctx.arc(startl.x, startl.y, rad, 0, 1*Math.PI, startl.y < endl.y);
                ctx.moveTo(endl.x, endl.y);
                ctx.arc(endl.x, endl.y, rad, 0, 1*Math.PI, startl.y > endl.y);
            }
            else if(startl.y === endl.y){
                ctx.fillRect(startl.x, startl.y-rad, endl.x-startl.x, 2*rad);
                ctx.moveTo(startl.x, startl.y);
                ctx.arc(startl.x, startl.y, rad, 1.5*Math.PI, 0.5*Math.PI, startl.x < endl.x);
                ctx.moveTo(endl.x, endl.y);
                ctx.arc(endl.x, endl.y, rad, 1.5*Math.PI, 0.5*Math.PI, startl.x > endl.x);
            }
            else{
                const prop = Math.cos(0.25*Math.PI); //sqrt(2)/2=sen(45°)=cos(45°)
                const offset = {
                    x: (startl.x > endl.x ? 1 : -1)*rad*prop,
                    y: (startl.y < endl.y ? 1 : -1)*rad*prop
                }
                ctx.moveTo(startl.x+offset.x, startl.y+offset.y);
                ctx.lineTo(endl.x+offset.x, endl.y+offset.y);
                ctx.lineTo(startl.x-offset.x, startl.y-offset.y);
                ctx.moveTo(endl.x-offset.x, endl.y-offset.y);
                ctx.lineTo(startl.x-offset.x, startl.y-offset.y);
                ctx.lineTo(endl.x+offset.x, endl.y+offset.y);
                if((startl.x > endl.x && startl.y > endl.y) || (startl.x < endl.x && startl.y < endl.y)){
                    ctx.moveTo(startl.x, startl.y);
                    ctx.arc(startl.x, startl.y, rad, 1.75*Math.PI, 0.75*Math.PI, startl.x < endl.x);
                    ctx.moveTo(endl.x, endl.y);
                    ctx.arc(endl.x, endl.y, rad, 1.75*Math.PI, 0.75*Math.PI, startl.x > endl.x);
                }
                else{
                    ctx.moveTo(startl.x, startl.y);
                    ctx.arc(startl.x, startl.y, rad, 0.25*Math.PI, 1.25*Math.PI, startl.x > endl.x);
                    ctx.moveTo(endl.x, endl.y);
                    ctx.arc(endl.x, endl.y, rad, 0.25*Math.PI, 1.25*Math.PI, startl.x < endl.x);
                }
            }
            
            ctx.closePath();
            ctx.fill();
        })

        ctx.fillStyle = '#00ff004f';
    }, [path, settings.width, settings.height])

    useEffect(() => {
        if(!isEnded) return;
        const startPos = [];
        const endPos = [];
        chars.forEach((row, i) => {
            row.forEach((char, j) => {
                if (char.start) {
                    startPos.push(i, j);
                }
                if (char.end) {
                    endPos.push(i, j);
                }
            })
        });
        const word = [];
        //Vertical
        if(startPos[1] === endPos[1]){
            if (startPos[0] < endPos[0]) {
                for (let i = startPos[0]; i <= endPos[0]; i++) {
                    word.push(chars[i][startPos[1]].letter);
                }
            }
            else {
                for (let i = startPos[0]; i >= endPos[0]; i--) {
                    word.push(chars[i][startPos[1]].letter);
                }
            }
        }
        //Horizontal
        else if(startPos[0] === endPos[0]){
            if (startPos[1] < endPos[1]) {
                for (let i = startPos[1]; i <= endPos[1]; i++) {
                    word.push(chars[startPos[0]][i].letter);
                }
            }
            else {
                for (let i = startPos[1]; i >= endPos[1]; i--) {
                    word.push(chars[startPos[0]][i].letter);
                }
            }
        }
        //Diagonal
        else if(startPos[0] !== endPos[0] && startPos[1] !== endPos[1]){
            if (startPos[0] < endPos[0] && startPos[1] < endPos[1]) {
                for (let i = 0; i <= endPos[0] - startPos[0]; i++) {
                    word.push(chars[startPos[0] + i][startPos[1] + i].letter);
                }
            }
            else if (startPos[0] < endPos[0] && startPos[1] > endPos[1]) {
                for (let i = 0; i <= endPos[0] - startPos[0]; i++) {
                    word.push(chars[startPos[0] + i][startPos[1] - i].letter);
                }
            }
            else if (startPos[0] > endPos[0] && startPos[1] < endPos[1]) {
                for (let i = 0; i <= startPos[0] - endPos[0]; i++) {
                    word.push(chars[startPos[0] - i][startPos[1] + i].letter);
                }
            }
            else if (startPos[0] > endPos[0] && startPos[1] > endPos[1]) {
                for (let i = 0; i <= startPos[0] - endPos[0]; i++) {
                    word.push(chars[startPos[0] - i][startPos[1] - i].letter);
                }
            }
        }
        if(answers.includes(word.join(''))){
            handleCount();
        }
        else{
            setPath(path => path.slice(0, path.length-1))
        }
        dispatch({ type: 'unselect-all' });
    }, [isEnded])

    return (
        <div
            onTouchStart={start}
            onTouchMove={move}
            onTouchEnd={end}
            onTouchCancel={end}
            onMouseDown={start}
            onMouseMove={move}
            onMouseUp={end}
            onMouseLeave={end}
        >
            <canvas 
                ref={canvasRef} 
                style={styles.canvas} 
                width={settings.width} 
                height={settings.height} 
            />
            {children}
        </div>
    )
}

export default WordsMap