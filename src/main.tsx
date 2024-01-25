import { createSignal, type Component, Show } from "solid-js";
import styles from "./App.module.css";
import { state, setState, canAdvance, advance } from "./store";
import { Template } from "./Template";

export const Main: Component = () => {
  return (
    <Template>
      <Show when={canAdvance()}>
        <button
          class={styles.btn}
          onClick={() => advance()}
        >
          Advance
        </button>
      </Show>
      <button class={styles.btn} onClick={() => setState("action", "Meditate")}>
        Meditate
      </button>
    </Template>
  );
};
