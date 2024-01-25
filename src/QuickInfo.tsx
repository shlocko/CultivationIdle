import { type Component } from "solid-js";
import styles from "./App.module.css";
import { state, rankInfo } from "./store";

export const QuickInfo: Component = () => {
  return (
    <div class={styles.quickinfo}>
      <p>
        {" "}
        Mana: {state.mana.toFixed(1)} of {state.maxMana.toFixed(1)}{" "}
      </p>
      <p> Your current rank is: {rankInfo[state.rank].name} </p>
      <p> Your current action: {state.action} </p>
    </div>
  );
};
