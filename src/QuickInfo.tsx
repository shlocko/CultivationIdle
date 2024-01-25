import { type Component } from "solid-js";
import styles from "./App.module.css";
import { state, rankInfo } from "./store";

export const QuickInfo: Component = () => {
  return (
    <div class={styles.quickinfo}>
      <p>
        Mana: {state.mana.toFixed(1)} of {state.maxMana.toFixed(1)}
      </p>
      <p> Rank: {rankInfo[state.rank].name} </p>
      <p> Action: {state.action} </p>
      <p> Next Advancement: {rankInfo[state.rank].advMana} </p>
      <p> Aspect: {state.aspect} </p>
    </div>
  );
};
