import { useEffect, useState } from 'react';

function WordsTable({ table, settings }) {
  
    const [width, setWidth] = useState(0);
    const [height, setHeight] = useState(0);

    const ratio = width / height;

    const styles = {
        grid: {
            display: 'grid',
            gridTemplateColumns: 'repeat(7, 1fr)',
            gridTemplateRows: 'repeat(9, 1fr)',
            width: settings.width,
            height: settings.height,
            margin: '0 auto',
            border: 'none',
            borderRadius: '10px',
            overflow: 'hidden',
        }
    }

    const setButtonStyles = (table, row, col) => {
        const styles = {
            border: '1px solid black',
            backgroundColor: 'white',
            color: 'black',
            fontWeight: 'bold',
            fontSize: settings.width / table[0].length*0.45,
        }
        if(row === 0 && col === 0) {
            return { ...styles, borderTop: 'none', borderLeft: 'none' }
        }
        else if(row === 0 && col === table[0].length - 1) {
            return { ...styles, borderTop: 'none', borderRight: 'none' }
        }
        else if(row === table.length - 1 && col === 0) {
            return { ...styles, borderBottom: 'none', borderLeft: 'none' }
        }
        else if(row === table.length - 1 && col === table[0].length - 1) {
            return { ...styles, borderBottom: 'none', borderRight: 'none' }
        }
        if(row === 0) {
            return { ...styles, borderTop: 'none' }
        }
        else if(row === table.length - 1) {
            return { ...styles, borderBottom: 'none' }
        }
        if(col === 0) {
            return { ...styles, borderLeft: 'none' }
        }
        else if(col === table[0].length - 1) {
            return { ...styles, borderRight: 'none' }
        }
        return styles;
    }

    return (
        <div style={styles.grid}>
            {table.map((row, i) => {
                return (
                        row.map((letter, j) => {
                        return (
                            <button 
                                key={`${i}$${j}`} 
                                id={`${i}$${j}`}
                                style={setButtonStyles(table, i, j)}
                            >
                                {letter}
                            </button>
                        )
                    })
                )
            })}
        </div>
    )
}

export default WordsTable;