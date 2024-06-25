import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
      <div className={styles.homeWrapper}>
        <p className={styles.description}>Quiz</p>
        <p className={styles.description}>반갑습니다. </p>
        <Link 
          className={styles.startBtn} 
          href="/quiz">
          퀴즈 시작하기
        </Link>
      </div>
    </>
  );
}
