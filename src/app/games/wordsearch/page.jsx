"use client"
import Wordsearch from '@/components/Wordsearch/Wordsearch'
import styles from './page.module.scss'
import { useEffect, useState } from 'react';

export default function WordSearchGame() {

    const [width, setWidth] = useState(0);
    const [height, setHeight] = useState(0);

    const ratio = width / height;

    const [count, setCount] = useState(0);
    const handleCount = () => { setCount(count+1) }

    const table = [
        ['E', 'B', 'C', 'D', 'E', 'F', 'G'],
        ['F', 'A', 'P', 'P', 'B', 'N', 'A'],
        ['E', 'P', 'Q', 'R', 'C', 'T', 'U'],
        ['C', 'W', 'X', 'Y', 'R', 'A', 'B'],
        ['T', 'A', 'R', 'J', 'E', 'T', 'A'],
        ['I', 'K', 'L', 'M', 'D', 'O', 'P'],
        ['V', 'R', 'S', 'T', 'I', 'V', 'W'],
        ['O', 'B', 'C', 'D', 'T', 'F', 'G'],
        ['H', 'I', 'J', 'K', 'O', 'M', 'N']
    ]

    const answers = [
        'EFECTIVO',
        'TARJETA',
        'CREDITO',
        'APPBNA'
    ]

    const settings = {
        width: Number(ratio > 0.6 ? 0.56*height : 0.84*width),
        height: Number(ratio > 0.6 ? 0.72*height : 1.08*width)
        //                          0.08 x 0.08    0.12 x 0.12
    }

    useEffect(() => {
        setWidth(window.innerWidth);
        setHeight(window.innerHeight);
    }, []);

    return (
        <div>
            <h1 className={styles.title}>Wordsearch</h1>
            <h2 className={styles.subtitle}>Encuentra las palabras</h2>
            <h3>{count}</h3>
            <Wordsearch 
                table={table}
                answers={answers}
                settings={settings} 
                handleCount={handleCount}
            />
        </div>
    )
}