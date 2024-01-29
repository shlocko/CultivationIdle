import { For, type Component } from "solid-js";
import utils from "../styles/utils.module.css";
import { setState } from "../state/store";

export const ChooseAspect: Component = () => {
  return (
    <div class={utils.container}>
      <h3> Choose an aspect for your mana: </h3>
      <button
        class={utils.btn}
        onClick={() => {
          setState("aspect", "Fire");
        }}
      >
        {"Fire"}
      </button>
      <button
        class={utils.btn}
        onClick={() => {
          setState("aspect", "Water");
        }}
      >
        {"Water"}
      </button>
      <button
        class={utils.btn}
        onClick={() => {
          setState("aspect", "Wind");
        }}
      >
        {"Wind"}
      </button>
    </div>
  );
};
