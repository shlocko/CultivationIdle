import {
  type Component,
  children,
  JSXElement,
  onMount,
  onCleanup,
} from "solid-js";
import styles from "./App.module.css";
import { state, setState, tick, tickSpeed } from "./store";
import { Nav } from "./Nav";

export const Template: Component<{ children: JSXElement }> = (props) => {
  const timer = setInterval(() => {
    setState("bar", (bar) => bar + 1.0 / tickSpeed());
    if (state.bar > 100) {
      setState("bar", 0.0);
      tick[state.action]();
    }
  }, 10);
  onCleanup(() => {
    clearInterval(timer);
  });
  return (
    <div class={styles.App}>
      <Nav />
      <progress max="100" value={state.bar}>
        {state.bar}/100
      </progress>
      {props.children}
    </div>
  );
};
