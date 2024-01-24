import { createSignal, type Component } from 'solid-js';
import { state } from './store';
import styles from './App.module.css';

const Test: Component = () => {

    return(
    <div class={styles.container}>
        Test
    </div>
    )
}

export default Test;
