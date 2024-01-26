import { Show, type Component, Switch, Match } from "solid-js";
import styles from "./App.module.css";
import { Template } from "./Template";
import { opponent, setPause, setState, state } from "./store";

export const Combat: Component = () => {
  return (
    <Template>
      <h2> Combat </h2>
      <Switch>
        <Match when={state.action !== "Combat"}>
          <button
            class={(styles.btn, styles.top_auto)}
            onClick={() => setState("action", "Combat")}
          >
            Fight
          </button>
        </Match>
        <Match when={state.action === "Combat"}>
          <p class={styles.top_auto}> Opponent: {opponent.health} HP. </p>
          <button
            class={styles.btn}
            onClick={() => {
              setPause(false);
            }}
          >
            {" "}
            Next{" "}
          </button>
        </Match>
      </Switch>
    </Template>
  );
};
