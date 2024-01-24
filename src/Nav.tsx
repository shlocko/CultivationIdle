import { type Component } from "solid-js";
import styles from "./App.module.css";
import { state, setState } from "./store";

const Nav: Component = () => {
  return (
    <div class={styles.nav}>
      <a class={styles.nav_item} href="/">
        Main
      </a>
      <a class={styles.nav_item} href="/train">
        Test
      </a>
    </div>
  );
};

export default Nav;
