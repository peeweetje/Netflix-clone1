import { css } from '../../styled-system/css';

const Home = () => {
  return (
    <main>
      <h1
        className={css({
          color: 'amber.500',
        })}
      >
        Hello 🐼!
      </h1>
    </main>
  );
};

export default Home;
