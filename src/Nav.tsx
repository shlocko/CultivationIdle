import { type Component } from "solid-js";
import styles from "./App.module.css";
import { A } from "@solidjs/router";

export const Nav: Component = () => {
  return (
    <div class={styles.nav}>
      <A class={styles.nav_item} href="/">
        Meditate
      </A>
      <A class={styles.nav_item} href="/train">
        Train
      </A>
    </div>
  );
};
