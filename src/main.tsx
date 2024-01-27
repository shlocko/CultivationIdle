import { createSignal, type Component, Show } from "solid-js";
import utils from "./styles/utils.module.css";
import { state, setState, canAdvance, advance, setAction } from "./store";
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
