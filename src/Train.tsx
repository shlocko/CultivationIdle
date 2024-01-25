import { createSignal, type Component } from "solid-js";
import { state, setState } from "./store";
import styles from "./App.module.css";
import { Template } from "./Template";

export const Train: Component = () => {
  return (
    <Template>
      <button class={styles.btn} onClick={() => setState("action", "Train")}>
        Train
      </button>{" "}
    </Template>
  );
};
