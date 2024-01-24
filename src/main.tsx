import { createSignal, type Component } from "solid-js";
import styles from "./App.module.css";
import { state, setState } from "./store";
import Template from "./Template";

const Main: Component = () => {
  return (
    <Template>
    <div class={styles.container}>
      <div>
        <button onClick={() => setState("action", "Cycle")}>Cycle</button>
        <button onClick={() => setState("action", "Train")}>Train</button>
      </div>
      <p>
        {" "}
        Mana: {state.mana.toFixed(1)} of {state.maxMana.toFixed(1)}{" "}
      </p>
      <p> Your current action: {state.action} </p>
    </div>
    </Template>
  );
};

export default Main;
