import { For, type Component } from "solid-js";
import utils from "../styles/utils.module.css";
import { setState } from "../state/store";
import { modalChooseTechniqe } from "../state/modalMessages";

export const ChooseAspect: Component = () => {
  return (
    <div class={utils.container}>
      <h3> Choose an aspect for your mana: </h3>
      <button
        class={utils.btn}
        onClick={() => {
          setState("aspect", "Fire");
          modalChooseTechniqe();
        }}
      >
        {"Fire"}
      </button>
      <button
        class={utils.btn}
        onClick={() => {
          setState("aspect", "Water");
          modalChooseTechniqe();
        }}
      >
        {"Water"}
      </button>
      <button
        class={utils.btn}
        onClick={() => {
          setState("aspect", "Wind");
          modalChooseTechniqe();
        }}
      >
        {"Wind"}
      </button>
    </div>
  );
};
