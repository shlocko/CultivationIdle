import { createSignal, type Component, Show } from "solid-js";

import styles from "./App.module.css";
import { state, setState, tickSpeed, tick } from "./store";

const App: Component = () => {
  const timer = setInterval(() => {
    setState("bar", (bar) => bar + 1.0 / tickSpeed());
    if (state.bar > 100) {
      setState("bar", 0.0);
      tick[state.action]();
    }
  }, 10);

  return <div class={styles.App}></div>;
};

export default App;
