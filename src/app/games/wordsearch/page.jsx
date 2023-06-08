"use client"
import Wordsearch from '@/components/Wordsearch/Wordsearch'
import styles from './page.module.scss'
import { useEffect, useState } from 'react';

export default function WordSearchGame() {

    const [width, setWidth] = useState(0);
    const [height, setHeight] = useState(0);

    const ratio = width / height;

    const table = [
        ['A', 'B', 'C', 'D', 'E', 'F', 'G'],
        ['H', 'I', 'J', 'K', 'L', 'M', 'N'],
        ['O', 'P', 'Q', 'R', 'S', 'T', 'U'],
        ['V', 'W', 'X', 'Y', 'Z', 'A', 'B'],
        ['C', 'D', 'E', 'F', 'G', 'H', 'I'],
        ['J', 'K', 'L', 'M', 'N', 'O', 'P'],
        ['Q', 'R', 'S', 'T', 'U', 'V', 'W'],
        ['A', 'B', 'C', 'D', 'E', 'F', 'G'],
        ['H', 'I', 'J', 'K', 'L', 'M', 'N']
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
            <Wordsearch table={table} settings={settings} />
        </div>
    )
}