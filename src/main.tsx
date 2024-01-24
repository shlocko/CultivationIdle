import { createSignal, type Component } from 'solid-js';
import styles from './App.module.css';
import { setAction, state } from './store';

const Main: Component = () => {

    return(
    <div class={styles.container}>
        <div>
            <button onClick={() => setAction('Cycle')}>Cycle</button>
            <button onClick={() => setAction('Train')}>Train</button>
        </div>
        <p> Mana: {state.mana.toFixed(1)} of {state.maxMana.toFixed(1)} </p>
        <p> Your current action: {state.action} </p>
    </div>
    )
}

export default Main;
