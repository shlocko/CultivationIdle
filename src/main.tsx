import { createSignal, type Component } from 'solid-js';
import styles from './App.module.css';
import { state } from './GlobalContext/store';

const Main: Component = () => {

    return(
    <div class={styles.container}>

        <progress max="100" value={state.bar}> </progress>
    </div>
    )
}

export default Main;
