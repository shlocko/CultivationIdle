import { createSignal, type Component } from 'solid-js';

import styles from './App.module.css';
import { state, setState } from './GlobalContext/store';

import Main from './main';


const App: Component = () => {
    const timer = setInterval(()=> {
        setState("bar", bar => bar + 1.0/state.tick);
        if(state.bar>100){
            setState("bar", 0.0);
        }
    }, 10);

  return (
    <div class={styles.App}>
        <div class={styles.nav}>
            <div class={styles.nav_item}>test</div>
            <div class={styles.nav_item}>test 2</div>
            <div class={styles.nav_item}>test</div>
        </div>
        <Main/>

    </div>
  );
};

export default App;
