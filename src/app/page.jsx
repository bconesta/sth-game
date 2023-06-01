import Button from '@/components/Button/Button'
import styles from './page.module.scss'
import { GiTrophy } from 'react-icons/gi';
import { BiLogIn } from 'react-icons/bi';
import Image from 'next/image';

export default function Home() {
  return (
    <div className={styles.container}>
      <div className={styles.grid}>
        <div className={styles.logo}>
          <Image src='/logo.png' fill/>
        </div>
        <h1 className={styles.title}>WORDLAND</h1>
        <Button to='/games/slide'>Letterslide</Button>
        <Button to='/games/wordsearch'>Word search</Button>
        <Button to='/user/settings' color="#000000aa">Settings</Button>
        <Button to='/games/rank' color="#ffdd00" size={50} height={80}>
          <GiTrophy className={styles.trophy} />
        </Button>
        <Button to='/user/login' success size={50} height={80}>
          <BiLogIn className={styles.login} />
        </Button>
      </div>
    </div>
  )
}