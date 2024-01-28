import { type Component } from "solid-js";
import styles from "./styles/Nav.module.css";
import { A } from "@solidjs/router";
import { setPause, load, persist } from "./store";
import toast from "solid-toast";

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
      <button
        onClick={() => {
          load();
          toast("Data Loaded");
        }}
      >
        <p>Load</p>
      </button>
      <button
        onClick={() => {
          persist();
          toast("Data Saved");
        }}
      >
        <p>Save</p>
      </button>
    </div>
  );
};
