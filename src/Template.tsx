import { type Component, children, JSXElement, onMount } from "solid-js";
import styles from "./App.module.css";
import { state, setState, init } from "./store";
import Nav from "./Nav";

const Template: Component<{ children: JSXElement }> = (props) => {
  onMount(() => {
    init();
  });
  const c = children(() => props.children);
  return (
    <div class={styles.App}>
      <Nav />
      <progress max="100" value={state.bar}>
        {state.bar}/100
      </progress>
      {c()}
    </div>
  );
};

export default Template;
