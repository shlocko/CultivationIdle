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
      <Show when={canAdvance()}>
        <button class={utils.btn} onClick={() => advance()}>
          Advance
        </button>
      </Show>
      <Show when={!state.aspect && state.rank >= 1}>
        <ChooseAspect />
      </Show>
      <For each={state.inventory}>
        {(item) => (
          <>
            <p>
              {" "}
              {item.item} x {item.quantity}
            </p>
            <button
              class={utils.btn}
              onClick={() => {
                inventoryRemove(item.item);
                toast(`${item.quantity} ${item.item} removed`);
              }}
            >
              X
            </button>
          </>
        )}
      </For>
      <button
        onClick={() => {
          inventoryAdd("Health Potion", 3);
        }}
      >
        Add 3 health Potion
      </button>
      <button
        class={(utils.btn, utils.top_auto)}
        onClick={() => setAction("Meditate")}
      >
        <p>Meditate</p>
      </button>
    </Template>
  );
};
