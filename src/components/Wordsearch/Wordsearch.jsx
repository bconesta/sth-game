import WordsTable from './WordsTable/WordsTable'
import WordsMap from './WordsMap/WordsMap'
import { useEffect, useReducer } from 'react';

function reducer(state, action) {
    switch (action.type) {
        case 'define-chars':
            return action.payload;
        case 'define-start':
            return state.map((row, i) => {
                return row.map((char, j) => {
                    if (i === action.payload.i && j === action.payload.j) {
                        return { ...char, start: true }
                    }
                    return char;
                })
            })
        case 'define-end':
            return state.map((row, i) => {
                return row.map((char, j) => {
                    if (i === action.payload.i && j === action.payload.j) {
                        return { ...char, end: true }
                    }
                    else if(char.end){
                        return { ...char, end: false }
                    }
                    return char;
                })
            })
        case 'unselect-all': {
            return state.map((row, i) => {
                return row.map((char, j) => {
                    return { ...char, start: false, end: false }
                })
            });
        }
    }
}


function Wordsearch({ table, settings }) {

    const [chars, dispatch] = useReducer(reducer, [{ size: settings.charSize }]);

    const styles = {
        container : {
            position: 'relative',
            width: settings.width,
            height: settings.height,
            margin: '0 auto' 
        }
    }

    useEffect(() => {
        const chars = table.map((row, i) => {
            const size = settings.width / row.length;
            return row.map((letter, j) => {
                return {
                    letter,
                    size,
                    start: false,
                    end: false
                }
            })
        })
        dispatch({ type: 'define-chars', payload: chars })
    }, [table]);

    return (
        <div style={styles.container}>
            <WordsMap 
                settings={settings}
                chars={chars}
                dispatch={dispatch}
            >
                <WordsTable table={table} settings={settings} />
            </WordsMap>
        </div>
    )
}

export default Wordsearch;