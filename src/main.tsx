import { createSignal, type Component, Show } from "solid-js";
import styles from "./App.module.css";
import { state, setState, canAdvance, advance } from "./store";
import { Template } from "./Template";
import { ChooseAspect } from "./ChooseAspect";

export const Main: Component = () => {
  return (
    <Template>
      <Show when={canAdvance()}>
        <button class={styles.btn} onClick={() => advance()}>
          Advance
        </button>
      </Show>
      <Show when={!state.aspectChosen && state.rank === 1}>
        <ChooseAspect />
      </Show>
      <button
        class={(styles.btn, styles.top_auto)}
        onClick={() => setState("action", "Meditate")}
      >
        Meditate
      </button>
    </Template>
  );
};
