import { useEffect, useRef } from "react";

function WordsMap({ children, settings, chars, dispatch }) {
    
    const canvasRef = useRef(null);
    
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
    }

    const move = (e) => {
        e.preventDefault();
        if(!chars.some(row => row.some(char => char.start))) return;
        const cords = getCords(e, canvasRef);
        const i = Math.floor(cords.y / chars[0][0].size);
        const j = Math.floor(cords.x / chars[0][0].size);
        dispatch({ type: 'define-end', payload: { i, j } });
    }

    const end = (e) => {
        e.preventDefault();
        dispatch({ type: 'unselect-all' });
    }

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, settings.width, settings.height);
        
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