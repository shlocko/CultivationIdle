import { For, type Component } from "solid-js";
import styles from "./App.module.css";
import { setState } from "./store";

export const ChooseAspect: Component = () => {
  return (
    <div class={styles.container}>
      <h3> Choose an aspect: </h3>
      <button
        class={styles.btn}
        onClick={() => {
          setState("aspect", "Fire");
          setState("aspectChosen", true);
        }}
      >
        {"Fire"}
      </button>
      <button
        class={styles.btn}
        onClick={() => {
          setState("aspect", "Water");
          setState("aspectChosen", true);
        }}
      >
        {"Water"}
      </button>
      <button
        class={styles.btn}
        onClick={() => {
          setState("aspect", "Wind");
          setState("aspectChosen", true);
        }}
      >
        {"Wind"}
      </button>
    </div>
  );
};
