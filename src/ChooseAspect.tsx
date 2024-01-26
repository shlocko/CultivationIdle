import { For, type Component } from "solid-js";
import utils from "./styles/utils.module.css";
import { setState } from "./store";

export const ChooseAspect: Component = () => {
  return (
    <div class={utils.container}>
      <h3> Choose an aspect: </h3>
      <button
        class={utils.btn}
        onClick={() => {
          setState("aspect", "Fire");
          setState("aspectChosen", true);
        }}
      >
        {"Fire"}
      </button>
      <button
        class={utils.btn}
        onClick={() => {
          setState("aspect", "Water");
          setState("aspectChosen", true);
        }}
      >
        {"Water"}
      </button>
      <button
        class={utils.btn}
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
