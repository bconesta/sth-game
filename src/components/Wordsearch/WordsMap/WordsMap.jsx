import { useEffect, useRef, useState } from "react";

function WordsMap({ children, settings, chars, dispatch }) {
    
    const canvasRef = useRef(null);
    
    const [path, setPath] = useState([]);

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
        setPath([{i, j}]);
    }

    const move = (e) => {
        e.preventDefault();
        if(!chars.some(row => row.some(char => char.start))) return;
        const cords = getCords(e, canvasRef);
        const i = Math.floor(cords.y / chars[0][0].size);
        const j = Math.floor(cords.x / chars[0][0].size);
        dispatch({ type: 'define-end', payload: { i, j } });
        if((Math.abs(path[0].i-i) === Math.abs(path[0].j-j)) || (path[0].i === i || path[0].j === j)){
            setPath(path=>[path[0], {i, j}]);
        }
    }

    const end = (e) => {
        e.preventDefault();
        dispatch({ type: 'unselect-all' });
    }

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, settings.width, settings.height);
        ctx.beginPath();
        if(path.length > 1){
            ctx.moveTo(path[0].j*chars[0][0].size+chars[0][0].size/2, path[0].i*chars[0][0].size+chars[0][0].size/2);
            ctx.lineTo(path[path.length-1].j*chars[0][0].size+chars[0][0].size/2, path[path.length-1].i*chars[0][0].size+chars[0][0].size/2)
        }
        ctx.closePath();
        ctx.strokeStyle = '#00ff004f';
        ctx.lineWidth = chars[0][0].size*0.65;
        ctx.stroke();
    }, [chars, settings.width, settings.height])

    return (
        <div
            onTouchStart={start}
            onTouchMove={move}
            onTouchEnd={end}
            onTouchCancel={end}
            onMouseDown={start}
            onMouseMove={move}
            onMouseUp={end}
            //onMouseLeave={end}
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