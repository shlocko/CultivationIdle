import { createSignal, type Component, Show, For } from "solid-js";
import utils from "./styles/utils.module.css";
import {
  state,
  setState,
  canAdvance,
  advance,
  setAction,
  inventoryRemove,
  inventoryAdd,
  load,
  persist,
} from "./store";
import { Template } from "./Template";
import { ChooseAspect } from "./ChooseAspect";
import toast from "solid-toast";

export const Main: Component = () => {
  return (
    <Template>
      <Show when={!state.aspect && state.rank >= 1}>
        <ChooseAspect />
      </Show>
      <button
        class={(utils.btn, utils.top_auto)}
        onClick={() => setAction("Meditate")}
      >
        <p>Meditate</p>
      </button>
    </Template>
  );
};
