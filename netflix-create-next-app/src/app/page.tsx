import { css } from '../../styled-system/css';
import { Poppins } from 'next/font/google';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400'],
});

export default function Home() {
  return (
    <main className={`${poppins.className}`}>
      <h1
        className={css({
          color: 'amber.500',
        })}
      >
        Hello 🐼!
      </h1>
    </main>
  );
}
