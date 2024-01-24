import { createSignal, type Component } from "solid-js";
import { state } from "./store";
import styles from "./App.module.css";
import Template from "./Template";

const Test: Component = () => {
  return (
    <Template>
      <div class={styles.container}>Test</div>
    </Template>
  );
};

export default Test;
