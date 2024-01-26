import { type Component } from "solid-js";
import styles from "./styles/Nav.module.css";
import { A } from "@solidjs/router";
import { setPause } from "./store";

export const Nav: Component = () => {
  return (
    <div class={styles.nav}>
      <A class={styles.nav_item} href="/">
        Meditate
      </A>
      <A class={styles.nav_item} href="/train">
        Train
      </A>
      <A class={styles.nav_item} href="/combat">
        Combat
      </A>
      <button
        class={styles.nav_item}
        onClick={() => {
          setPause((pause) => !pause);
        }}
      >
        Pause/Unpause
      </button>
    </div>
  );
};
