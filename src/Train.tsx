import { createSignal, type Component } from "solid-js";
import { state, setState } from "./store";
import utils from "./styles/utils.module.css";
import { Template } from "./Template";

export const Train: Component = () => {
  return (
    <Template>
      <button
        class={(utils.btn, utils.top_auto)}
        onClick={() => setState("action", "Train")}
      >
        <p>Train</p>
      </button>{" "}
    </Template>
  );
};
