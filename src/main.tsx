import { createSignal, type Component, Show } from "solid-js";
import utils from "./styles/utils.module.css";
import { state, setState, canAdvance, advance } from "./store";
import { Template } from "./Template";
import { ChooseAspect } from "./ChooseAspect";

export const Main: Component = () => {
  return (
    <Template>
      <Show when={canAdvance()}>
        <button class={utils.btn} onClick={() => advance()}>
          Advance
        </button>
      </Show>
      <Show when={!state.aspectChosen && state.rank === 1}>
        <ChooseAspect />
      </Show>
      <button
        class={(utils.btn, utils.top_auto)}
        onClick={() => setState("action", "Meditate")}
      >
        <p>Meditate</p>
      </button>
    </Template>
  );
};
