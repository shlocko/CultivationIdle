import { type Component } from "solid-js";
import styles from "./App.module.css";
import { state, setState } from "./store";
import { A } from "@solidjs/router";

export const Nav: Component = () => {
  return (
    <div class={styles.nav}>
      <A class={styles.nav_item} href="/">
        Main
      </A>
      <A class={styles.nav_item} href="/train">
        Test
      </A>
    </div>
  );
};
